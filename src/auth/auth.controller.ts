import { Controller, Get, UseGuards, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, // @Inject('Redis') private readonly redisClient
  ) {}

  @Get('token')
  async createToken(): Promise<any> {
    return await this.authService.createToken();
  }

  @Get('data')
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return [{ name: 'jack', age: 1 }];
  }
}
