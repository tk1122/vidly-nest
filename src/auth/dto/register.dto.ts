import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 255)
  password: string;

  @IsString()
  @Length(8, 255)
  passwordCheck: string;
}
