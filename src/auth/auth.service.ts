import * as jwt from 'jsonwebtoken';
import { Injectable, Inject } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { REDIS_CONNECTION } from '../constants';
import { RedisClient } from 'redis';
@Injectable()
export class AuthService {
  constructor(
    @Inject(REDIS_CONNECTION) private readonly redisClient: RedisClient,
  ) {}

  async createToken() {
    const user: JwtPayload = { email: 'test@email.com' };
    const expiresIn = 3600;
    const accessToken = jwt.sign(user, 'secretKey', { expiresIn });
    this.redisClient.set('id0001', accessToken);
    return {
      expiresIn,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    // return await this.usersService.findOneByToken(token);
    return {};
  }
}
