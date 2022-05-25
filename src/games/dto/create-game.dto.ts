import { IsNotEmpty, IsDateString } from 'class-validator';
import { Publisher } from 'src/publishers/publishers.entity';

export class CreateGameDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  publisher: Publisher;

  @IsNotEmpty()
  tags: string[];

  @IsNotEmpty()
  @IsDateString()
  releaseDate: string;
}
