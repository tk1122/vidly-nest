import {
  IsAlpha,
  IsNotEmpty,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional()
  @IsAlpha()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsPhoneNumber('VN')
  phoneNumber: string;
}
