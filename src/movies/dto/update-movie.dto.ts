import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  Min,
  Max,
  IsNumber,
  IsArray,
  IsPositive,
} from 'class-validator';

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsInt()
  @Min(5)
  @Max(50)
  numberInStock: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  dailyRentalRate: number;

  @IsOptional()
  @IsArray()
  @IsPositive({ each: true })
  genreIds: number[];
}
