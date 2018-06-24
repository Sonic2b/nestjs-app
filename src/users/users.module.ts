import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers';
@Module({
  imports: [
    // MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    // DatabaseModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
})
export class UserModule {}
