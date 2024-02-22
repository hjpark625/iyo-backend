import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Detail } from '@/detail/detail.schema';
import { DetailModel } from '@/dto/detail.dto';

@Injectable()
export class PinsService {
  constructor(@InjectModel(Detail.name) private detailModel: DetailModel) {}

  async getPinsData() {
    try {
      const result = await this.detailModel.find().exec();
      return result;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(`${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
