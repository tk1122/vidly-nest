import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/auth/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { RegisterDto, LoginDto } from './dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async createUser(userData: RegisterDto) {
    return this.userService.create(userData);
  }

  async createToken(userData: LoginDto) {
    const user = await this.userService.findOneByEmail(userData.email);
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const isPasswordValid = await compare(userData.password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid email or password');

    const token = await this.jwtService.sign({
      email: user.email,
      role: user.role || 'user',
    });

    return {
      message: 'Success',
      token,
      expiresIn: 3600,
    };
  }

  async validatePayload(payload: JwtPayload) {
    return this.userService.findOneByEmail(payload.email);
  }
}
