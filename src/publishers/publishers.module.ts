import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublishersRepository } from './publishers.repository';
import { PublishersService } from './publishers.service';
import { PublishersController } from './publishers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PublishersRepository])],
  providers: [PublishersService],
  controllers: [PublishersController],
})
export class PublishersModule {}
