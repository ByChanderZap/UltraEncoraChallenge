import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { GetGameFilterDto } from './dto/get-game-filter-dto';
import { Game } from './game.entity';

@EntityRepository(Game)
export class GameRepository extends Repository<Game> {
  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    const game = this.create({
      ...createGameDto,
    });

    await this.save(game);

    return game;
  }

  async deleteGame(id: string): Promise<UpdateResult> {
    return await this.softDelete(id);
  }

  async getGames(filterGamesDto: GetGameFilterDto): Promise<Game[]> {
    const { title } = filterGamesDto;
    const query = this.createQueryBuilder('game');
    if (title) {
      query.andWhere('LOWER(game.title) LIKE :title', {
        title: `%${title.toLowerCase()}%`,
      });
    }

    const games = await query.getMany();
    return games;
  }

  async getGamesByPublisherName(name: string): Promise<Game> {
    const query = this.createQueryBuilder('game');
    query.innerJoin('game.publisher', 'publisher');

    query.andWhere('LOWER(publisher.name) LIKE :name', {
      name: `%${name.toLowerCase()}%`,
    });

    const games = await query.getOne();
    return games;
  }
}
