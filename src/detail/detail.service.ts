import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Detail } from '@/detail/detail.schema';
import { DetailModel } from '@/dto/detail.dto';

@Injectable()
export class DetailService {
  constructor(@InjectModel(Detail.name) private detailModel: DetailModel) {}

  async getDetailData(storeName: string) {
    if (!storeName.trim()) throw new HttpException('정확한 상점 이름을 입력해주세요', HttpStatus.BAD_REQUEST);

    try {
      const detailData = await this.detailModel.findOne({ engName: storeName }).exec();

      if (detailData == null) throw new HttpException('상점 정보를 찾을 수 없습니다.', HttpStatus.NOT_FOUND);

      return {
        data: detailData,
      };
    } catch (err: unknown) {
      if (err instanceof HttpException) {
        throw new HttpException(err.getResponse(), err.getStatus());
      } else {
        throw new HttpException(`${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
