import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { ILoginInfo, LoginResponseDto } from '@/dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
      }
    }
  }
}
