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
      const mappedResult = result.map((item) => ({
        _id: item._id,
        lat: item.coord.lat,
        lng: item.coord.lng,
        name: item.name,
        engName: item.engName,
      }));

      return { pins: mappedResult };
    } catch (err: unknown) {
      if (err instanceof HttpException) {
        throw new HttpException({ message: err.getResponse() }, err.getStatus());
      }
    }
  }
}
