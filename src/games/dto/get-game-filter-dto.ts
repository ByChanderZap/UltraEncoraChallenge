import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetGameFilterDto {
  @IsOptional()
  @IsString()
  title?: string;
}
