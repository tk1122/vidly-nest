import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { RegisterDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userPepository: Repository<UserEntity>,
  ) {}

  async create(userData: RegisterDto) {
    const user = new UserEntity();
    if (userData.password !== userData.passwordCheck)
      throw new BadRequestException(
        'Password and password check must be identical',
      );

    const salt = await genSalt(10);
    const hashedPassword = await hash(userData.password, salt);

    user.email = userData.email;
    user.password = hashedPassword;

    return this.userPepository.save(user);
  }

  async findOneByEmail(email: string) {
    return this.userPepository.findOne({ email });
  }
}
