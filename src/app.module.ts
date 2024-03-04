import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggingMiddleware } from '@/middleware/logging.middleware';
import { DetailModule } from '@/detail/detail.module';
import { PinsModule } from '@/pins/pins.module';
import { AuthModule } from '@/auth/auth.module';
import { AppController } from '@/app.controller';
import type { MiddlewareConsumer } from '@nestjs/common';
import type { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): MongooseModuleFactoryOptions => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    DetailModule,
    PinsModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
