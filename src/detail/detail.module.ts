import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Detail, DetailSchema } from '@/detail/detail.schema';
import { DetailService } from '@/detail/detail.service';
import { DetailController } from '@/detail/detail.controller';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Detail.name,
        useFactory: () => {
          const schema = DetailSchema;
          return schema;
        },
      },
    ]),
  ],
  controllers: [DetailController],
  providers: [DetailService],
  exports: [DetailService],
})
export class DetailModule {}
