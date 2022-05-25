import { IsNotEmpty, IsString, IsNumber, IsMobilePhone } from 'class-validator';

export class CreatePublisherDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  siret: number;

  @IsNotEmpty()
  @IsString()
  @IsMobilePhone()
  phone: string;
}
