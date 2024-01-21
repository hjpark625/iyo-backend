import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Detail } from '@/detail/detail.schema';
import { PinsSchema } from '@/pins/pins.schema';
import { PinsController } from '@/pins/pins.controller';
import { PinsService } from '@/pins/pins.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Detail.name,
        useFactory: () => {
          const schema = PinsSchema;
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
