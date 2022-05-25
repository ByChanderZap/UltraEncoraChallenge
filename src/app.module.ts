import { Module } from '@nestjs/common';
import { GamesModule } from './games/games.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublishersModule } from './publishers/publishers.module';

@Module({
  imports: [
    GamesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'gamecenter',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PublishersModule,
  ],
})
export class AppModule {}
