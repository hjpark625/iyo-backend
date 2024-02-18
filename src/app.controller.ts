import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @HttpCode(HttpStatus.OK)
  healthCheck() {
    return { message: 'Server is running' };
  }
}
