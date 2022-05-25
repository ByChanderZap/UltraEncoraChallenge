import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  publisher: string;

  @IsNotEmpty()
  tags: string[];

  @IsNotEmpty()
  @IsDateString()
  releaseDate: string;
}
