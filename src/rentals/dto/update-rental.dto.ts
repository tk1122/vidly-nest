import { IsCurrency, IsPositive, IsOptional } from 'class-validator';

export class UpdateRentalDto {
  @IsOptional()
  @IsCurrency()
  rentalFee: string;

  @IsOptional()
  @IsPositive()
  customerId: number;

  @IsOptional()
  @IsPositive()
  movieId: number;
}
