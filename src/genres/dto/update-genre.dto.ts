import { IsAlpha, Length, IsOptional } from 'class-validator';

export class UpdateGenreDto {
  @IsOptional()
  @IsAlpha()
  @Length(4, 255)
  name: string;
}
