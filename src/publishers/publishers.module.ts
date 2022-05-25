import { Module } from '@nestjs/common';
import { PublishersService } from './publishers.service';

@Module({
  providers: [PublishersService],
})
export class PublishersModule {}
