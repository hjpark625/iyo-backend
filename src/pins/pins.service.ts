import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Detail } from '@/detail/detail.schema';
import { DetailModel } from '@/dto/detail.dto';
import { PinDTO, PinResponseDTO } from '@/dto/pins.dto';

@Injectable()
export class PinsService {
  constructor(@InjectModel(Detail.name) private detailModel: DetailModel) {}

  async getPinsData() {
    try {
      // TODO: 추후 데이터 증가로 인한 다량 조회 시 limit, offset 개념 적용 필요
      const responseData = await this.detailModel.find().exec();
      const mappedResultData = responseData.map((item) => new PinDTO(item));
      const finalResult = new PinResponseDTO(mappedResultData);
      return finalResult;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(`${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
