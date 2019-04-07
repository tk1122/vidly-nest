import { IsCurrency, IsPositive } from 'class-validator';

export class CreateRentalDto {
  @IsCurrency()
  rentalFee: string;

  @IsPositive()
  customerId: number;

  @IsPositive()
  movieId: number;
}
