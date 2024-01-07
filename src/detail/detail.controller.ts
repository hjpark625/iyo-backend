import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { DetailService } from '@/detail/detail.service';

@Controller('detail')
export class DetailController {
  constructor(private readonly detailService: DetailService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getDetail(): string {
    return this.detailService.getHello();
  }
}
