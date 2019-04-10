import { Controller, UseGuards, Post, Body, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto, LoginDto } from './dto';
import { Roles } from './decorators/roles.decorator';
import { RolesGaurd } from './gaurds/roles.gaurd';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: RegisterDto) {
    return this.authService.createUser(userData);
  }

  @Post('login')
  async login(@Body() userData: LoginDto) {
    return this.authService.createToken(userData);
  }

  @UseGuards(AuthGuard(), RolesGaurd)
  @Roles('admin')
  @Get('secret')
  async secret() {
    return 'secret message';
  }
}
