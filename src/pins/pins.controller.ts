import { Controller, Get, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { PinsService } from '@/pins/pins.service';

@Controller('pins')
export class PinsController {
  constructor(private readonly pinsService: PinsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getPinsData() {
    try {
      const result = await this.pinsService.getPinsData();
      return result;
    } catch (err: unknown) {
      if (err instanceof HttpException) {
        throw new HttpException({ message: err.getResponse() }, err.getStatus());
      }
    }
  }
}
