import type { JwtPayload } from 'jsonwebtoken';
import type { HydratedDocument, Model, ObjectId } from 'mongoose';

export class UserData {
  _id: ObjectId;
  email: string;
  password?: string;
  hashedPassword: string;
  createdAt: Date;
  updatedAt: Date | null;
  refreshToken: string | null;
  isAdmin: boolean;
}

export interface ILoginInfo {
  email: string;
  password: string;
}

export class IUserInstanceType extends UserData {
  checkPassword: (password: string) => Promise<boolean>;
  serialize: () => UserData;
  saveRefreshToken: (refreshToken: string) => Promise<void>;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}

export interface IUserModel extends Model<UserData, object, IUserInstanceType> {
  findByAdminEmail: (email: string) => Promise<HydratedDocument<UserData, IUserInstanceType>>;
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
  hashedPassword: string;
  createdAt: Date;
  updatedAt: Date | null;
  isAdmin: boolean;

  constructor(data: UserData) {
    this.userId = data._id;
    this.email = data.email;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.isAdmin = data.isAdmin;
  }
}

export class LoginResponseDto {
  user: {
    info: UserDTO;
    accessToken: string;
    refreshToken: string;
  };

  constructor(userData: {
    user: HydratedDocument<UserData, IUserInstanceType>;
    accessToken: string;
    refreshToken: string;
  }) {
    this.user = {
      info: new UserDTO(userData.user),
      accessToken: userData.accessToken,
      refreshToken: userData.refreshToken,
    };
  }
}
