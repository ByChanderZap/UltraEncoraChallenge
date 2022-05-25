import { BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { GetGameFilterDto } from './dto/get-game-filter-dto';
import { Game } from './game.entity';

@EntityRepository(Game)
export class GameRepository extends Repository<Game> {
  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    try {
      const game = this.create({
        ...createGameDto,
      });

      await this.save(game);

      return game;
    } catch (error) {
      if (
        error.message ===
        'insert or update on table "game" violates foreign key constraint "FK_2f2b221a8d12030c4e59d13663d"'
      )
        throw new BadRequestException('Please provide a valid publisher id');
    }
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

  async getPublisherDataByName(name: string): Promise<Game> {
    const query = this.createQueryBuilder('game');
    query.select(['"publisher".*']);
    query.innerJoin('game.publisher', 'publisher');
    query.where('LOWER(publisher.name) LIKE :name', {
      name: `%${name.toLowerCase()}%`,
    });
    const games = await query.getRawOne();
    return games;
  }

  async removeWhenOlderThan18Months(): Promise<Game[]> {
    const query = this.createQueryBuilder('game');
    query.andWhere('game.releaseDate < :releaseDate', {
      releaseDate: new Date(
        /*
         *  From the current date, subtract 18 months
         *  (18 months in milliseconds)
         */
        new Date().getTime() - 18 * 30 * 24 * 60 * 60 * 1000,
      ),
    });

    const games = await query.getMany();

    await games.forEach((game) => this.softDelete(game.id));

    return games;
  }

  async updatePricesBetween12and18Monts(): Promise<Game[]> {
    const query = this.createQueryBuilder('game');
    const start = new Date(
      /*
       *  From the current date, subtract 18 months
       *  (18 months in milliseconds)
       */
      new Date().getTime() - 18 * 30 * 24 * 60 * 60 * 1000,
    );

    const end = new Date(
      /*
       *  From the current date, subtract 12 months
       *  (12 months in milliseconds)
       */
      new Date().getTime() - 12 * 30 * 24 * 60 * 60 * 1000,
    );
    query.select('*');
    query.where(
      `game.releaseDate BETWEEN '${start.toISOString()}' AND '${end.toISOString()}'`,
    );

    const games = await query.getRawMany();
    await games.forEach((game) => {
      game.price = Math.floor(game.price * 0.8);
      this.save(game);
    });
    return games;
  }
}
