import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/auth.service';
import { User, UserSchema } from '@/auth/auth.schema';
import type { JwtModuleOptions } from '@nestjs/jwt';
import type { ObjectId } from 'mongoose';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): JwtModuleOptions => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { algorithm: 'HS256' },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          const schema = UserSchema;

          schema.methods.checkPassword = async function (password: string) {
            const result = await bcrypt.compare(password, this.hashedPassword);
            return result;
          };

          schema.methods.generateAccessToken = function () {
            const accessToken = jwt.sign(
              {
                userId: this._id as ObjectId,
                email: this.email,
              },
              configService.get<string>('JWT_SECRET'),
              {
                algorithm: 'HS256',
                expiresIn: '30m',
              },
            );
            return accessToken;
          };

          schema.methods.generateRefreshToken = function () {
            const refreshToken = jwt.sign(
              {
                userId: this._id as ObjectId,
                email: this.email,
                hashedPassword: this.hashedPassword,
              },
              configService.get<string>('JWT_SECRET'),
              {
                algorithm: 'HS256',
                expiresIn: '14d',
              },
            );
            return refreshToken;
          };

          schema.methods.serialize = function () {
            const data = this.toJSON();
            delete data.hashedPassword;
            delete data.refreshToken;
            return data;
          };

          schema.statics.findByAdminEmail = function (email: string) {
            const userData = this.findOne({ email });
            return userData;
          };

          return schema;
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
