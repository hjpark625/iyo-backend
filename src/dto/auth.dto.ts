import type { JwtPayload } from 'jsonwebtoken';
import type { HydratedDocument, ObjectId, Model } from 'mongoose';
import { User } from '@/auth/auth.schema';

export interface ILoginInfo {
  email: string;
  password: string;
}

export abstract class UserMethodsClass extends User {
  checkPassword: (password: string) => Promise<boolean>;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}

export interface IUserModel extends Model<User, object, UserMethodsClass> {
  findByAdminEmail: (email: string) => Promise<HydratedDocument<User, UserMethodsClass>>;
}

export interface IDecodedTokenInfo extends JwtPayload {
  userId: string;
  email: string;
  hashedPassword: string;
  iat: number;
  exp: number;
}

export class UserDTO {
  userId: ObjectId;
  email: string;
  nickname: string;
  hashedPassword: string;
  createdAt: Date;
  updatedAt: Date | null;
  lastLoginAt: Date | null;
  isAdmin: boolean;

  constructor(data: User) {
    this.userId = data._id;
    this.email = data.email;
    this.nickname = data.nickname;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.lastLoginAt = data.lastLoginAt;
    this.isAdmin = data.isAdmin;
  }
}

export class LoginResponseDto {
  user: {
    info: UserDTO;
    accessToken: string;
    refreshToken: string;
  };

  constructor(userData: { user: HydratedDocument<User, UserMethodsClass>; accessToken: string; refreshToken: string }) {
    this.user = {
      info: new UserDTO(userData.user),
      accessToken: userData.accessToken,
      refreshToken: userData.refreshToken,
    };
  }
}
