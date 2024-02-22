import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Detail, DetailSchema } from '@/detail/detail.schema';
import { PinsController } from '@/pins/pins.controller';
import { PinsService } from '@/pins/pins.service';

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
  controllers: [PinsController],
  providers: [PinsService],
  exports: [PinsService],
})
export class PinsModule {}
