import { Controller, Get, HttpCode, HttpException, HttpStatus, Param } from '@nestjs/common';
import { DetailService } from '@/detail/detail.service';

@Controller('detail')
export class DetailController {
  constructor(private readonly detailService: DetailService) {}

  @Get(':storename')
  @HttpCode(HttpStatus.OK)
  async getDetailData(@Param('storename') storeName: string) {
    try {
      const result = this.detailService.getDetailData(storeName);
      return result;
    } catch (err: unknown) {
      if (err instanceof HttpException) {
        throw new HttpException({ message: err.getResponse() }, err.getStatus());
      }
    }
  }
}
