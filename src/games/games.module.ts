import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesController } from './games.controller';
import { GameRepository } from './games.repository';
import { GamesService } from './games.service';

@Module({
  imports: [TypeOrmModule.forFeature([GameRepository])],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
