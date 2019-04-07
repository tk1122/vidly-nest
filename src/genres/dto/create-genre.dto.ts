import { IsAlpha, Length } from 'class-validator';

export class CreateGenreDto {
  @IsAlpha()
  @Length(4, 255)
  name: string;
}
