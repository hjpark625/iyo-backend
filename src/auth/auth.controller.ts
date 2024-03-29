import { Body, Controller, Headers, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { ILoginInfo, IRegisterInfo, LoginResponseDto } from '@/dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: IRegisterInfo) {
    const { email, password, nickname } = body;
    if (!email || !password) {
      throw new HttpException('이메일과 비밀번호를 입력해주세요.', HttpStatus.BAD_REQUEST);
    }

    try {
      const result = await this.authService.registerUser(email, password, nickname);
      const responseData = new LoginResponseDto(result);

      return responseData;
    } catch (err: unknown) {
      if (err instanceof HttpException) {
        throw new HttpException({ message: err.message, status: err.getStatus() }, err.getStatus());
      } else {
        throw new HttpException(
          { message: `${err}`, status: HttpStatus.INTERNAL_SERVER_ERROR },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: ILoginInfo) {
    const { email, password } = body;
    if (!email || !password) {
      throw new HttpException('이메일과 비밀번호를 입력해주세요.', HttpStatus.BAD_REQUEST);
    }

    try {
      const result = await this.authService.loginWithValidateUser(email, password);
      const responseData = new LoginResponseDto(result);

      return responseData;
    } catch (err: unknown) {
      if (err instanceof HttpException) {
        throw new HttpException({ message: err.message, status: err.getStatus() }, err.getStatus());
      } else {
        throw new HttpException(
          { message: `${err}`, status: HttpStatus.INTERNAL_SERVER_ERROR },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Headers('Authorization') refreshToken: string) {
    try {
      await this.authService.logoutUser(refreshToken);
      return;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException({ message: err.message, status: err.getStatus() }, err.getStatus());
      } else {
        throw new HttpException(
          { message: `${err}`, status: HttpStatus.INTERNAL_SERVER_ERROR },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async revalidateToken(@Headers('Authorization') refreshToken: string) {
    try {
      const result = await this.authService.revalidateAccessToken(refreshToken);
      if (result == null) throw new HttpException('토큰이 만료되었습니다.', HttpStatus.UNAUTHORIZED);
      return { result };
    } catch (err: unknown) {
      if (err instanceof HttpException) {
        throw new HttpException({ message: err.message, status: err.getStatus() }, err.getStatus());
      } else {
        throw new HttpException(
          { message: `${err}`, status: HttpStatus.INTERNAL_SERVER_ERROR },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
