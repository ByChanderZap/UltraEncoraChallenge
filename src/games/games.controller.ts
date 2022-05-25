import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { GetGameFilterDto } from './dto/get-game-filter-dto';
import { Game } from './game.entity';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get()
  getGames(@Query() filterDto: GetGameFilterDto): Promise<Game[]> {
    return this.gamesService.getGames(filterDto);
  }

  @Get('/:id')
  getGameById(@Param('id') id: string): Promise<Game> {
    return this.gamesService.getGameById(id);
  }

  @Post()
  createGame(@Body() createGameDto: CreateGameDto): Promise<Game> {
    return this.gamesService.createGame(createGameDto);
  }

  @Delete('/:id')
  deleteGame(@Param('id') id: string): Promise<void> {
    return this.gamesService.deleteGame(id);
  }

  @Put('/:id')
  updateGame(
    @Param('id') id: string,
    @Body() updateGameDto: CreateGameDto,
  ): Promise<Game> {
    return this.gamesService.updateGame(id, updateGameDto);
  }

  @Get('/name/:name')
  getGamesByPublisherName(@Param('name') name: string): Promise<Game> {
    return this.gamesService.getGamesByPublisherName(name);
  }
}
