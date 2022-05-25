import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { GetGameFilterDto } from './dto/get-game-filter-dto';
import { Game } from './game.entity';
import { GameRepository } from './games.repository';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(GameRepository)
    private gameRepository: GameRepository,
  ) {}

  async getGameById(id: string): Promise<Game> {
    const found = await this.gameRepository.findOne(id);
    if (!found) throw new NotFoundException(`Game with id ${id} not found`);
    return found;
  }

  createGame(createGameDto: CreateGameDto): Promise<Game> {
    return this.gameRepository.createGame(createGameDto);
  }

  async deleteGame(id: string): Promise<void> {
    const result = await this.gameRepository.deleteGame(id);
    if (result.affected === 0)
      throw new NotFoundException(`Game with id ${id} not found`);
  }

  async updateGame(id: string, updateGameDto: CreateGameDto): Promise<Game> {
    const game = await this.getGameById(id);
    return this.gameRepository.save({
      ...game,
      ...updateGameDto,
    });
  }

  getGames(filterDto: GetGameFilterDto): Promise<Game[]> {
    return this.gameRepository.getGames(filterDto);
  }

  getGamesByPublisherName(name: string): Promise<Game> {
    return this.gameRepository.getGamesByPublisherName(name);
  }
}
