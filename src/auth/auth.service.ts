import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '@/auth/auth.schema';
import { IUserModel } from '@/dto/auth.dto';
import type { IDecodedTokenInfo } from '@/dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: IUserModel, private jwtService: JwtService) {}

  async loginWithValidateUser(email: string, password: string) {
    try {
      const user = await this.userModel.findByAdminEmail(email);
      if (!user) throw new HttpException('존재하지 않는 어드민 계정입니다.', HttpStatus.NOT_FOUND);

      const isValidPassword = await user.checkPassword(password);
      if (!isValidPassword) throw new HttpException('비밀번호가 일치하지 않습니다.', HttpStatus.UNAUTHORIZED);

      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();

      await this.userModel.findByIdAndUpdate(user._id, { refreshToken, lastLoginAt: new Date() });

      return { accessToken, refreshToken, user };
    } catch (err: unknown) {
      if (err instanceof HttpException) {
        throw new HttpException({ message: err.message, status: err.getStatus() }, err.getStatus());
      }
    }
  }

  async hashingPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async registerUser(email: string, password: string, nickname: string | null) {
    try {
      const user = await this.userModel.findByAdminEmail(email);
      if (user) throw new HttpException('이미 존재하는 어드민 계정입니다.', HttpStatus.CONFLICT);

      const tempNickname = email.split('@')[0];
      const hashedPassword = await this.hashingPassword(password);

      const newUser = new this.userModel({
        _id: new mongoose.Types.ObjectId(),
        email,
        hashedPassword,
        nickname: nickname ?? tempNickname,
      });

      const accessToken = newUser.generateAccessToken();
      const refreshToken = newUser.generateRefreshToken();

      await newUser.save();

      return { accessToken, refreshToken, user: newUser };
    } catch (err: unknown) {
      if (err instanceof HttpException) {
        throw new HttpException({ message: err.message, status: err.getStatus() }, err.getStatus());
      }
    }
  }

  async logoutUser(refreshToken: string) {
    try {
      const token = await this.checkHeader(refreshToken);

      const { userId } = this.jwtService.verify<IDecodedTokenInfo>(token);

      const user = await this.userModel.findById(new mongoose.Types.ObjectId(userId));

      if (!user) throw new HttpException('존재하지 않는 유저입니다.', HttpStatus.NOT_FOUND);
      if (user.refreshToken !== token) {
        throw new HttpException('토큰이 일치하지 않거나 잘못된 토큰입니다.', HttpStatus.UNAUTHORIZED);
      }

      await this.userModel.findByIdAndUpdate(user._id, { refreshToken: null });
      return;
    } catch (err: unknown) {
      if (err instanceof HttpException) {
        throw new HttpException({ message: err.message, status: err.getStatus() }, err.getStatus());
      }
      if (err instanceof JsonWebTokenError) {
        throw new HttpException({ message: err.message, status: HttpStatus.UNAUTHORIZED }, HttpStatus.UNAUTHORIZED);
      }
    }
  }

  async checkHeader(header: string) {
    try {
      if (!header) throw new HttpException('헤더가 존재하지 않습니다', HttpStatus.BAD_REQUEST);
      const [tokenType, tokenValue] = header.split(/\s+/g);
      if (tokenType !== 'Bearer') throw new HttpException('올바른 토큰 타입이 아닙니다.', HttpStatus.BAD_REQUEST);
      if (tokenValue == null) throw new HttpException('토큰이 존재하지 않습니다.', HttpStatus.BAD_REQUEST);
      return tokenValue;
    } catch (err: unknown) {
      if (err instanceof HttpException) {
        throw new HttpException({ message: err.message, status: err.getStatus() }, err.getStatus());
      }
    }
  }

  async revalidateAccessToken(refreshToken: string) {
    try {
      const token = await this.checkHeader(refreshToken);
      const { userId } = this.jwtService.verify<IDecodedTokenInfo>(token);
      const user = await this.userModel.findById(new mongoose.Types.ObjectId(userId));

      if (!user) throw new HttpException('존재하지 않는 유저입니다.', HttpStatus.NOT_FOUND);
      if (user.refreshToken === token) {
        const accessToken = user.generateAccessToken();
        return { accessToken };
      } else {
        throw new HttpException('토큰이 유효하지 않거나 잘못된 토큰입니다.', HttpStatus.BAD_REQUEST);
      }
    } catch (err: unknown) {
      if (err instanceof HttpException) {
        throw new HttpException({ message: err.message, status: err.getStatus() }, err.getStatus());
      }
      if (err instanceof JsonWebTokenError) {
        throw new HttpException({ message: err.message, status: HttpStatus.UNAUTHORIZED }, HttpStatus.UNAUTHORIZED);
      }
    }
  }
}
