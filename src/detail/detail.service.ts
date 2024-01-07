import { Injectable } from '@nestjs/common';

@Injectable()
export class DetailService {
  getHello(): string {
    return 'This is Detail';
  }
}
