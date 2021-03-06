import {
  Module,
  ForbiddenException,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { UserModule } from './users/users.module';
import { LoggerMiddleware } from './common/middlewares';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RolesGuard } from './common/guards';
@Module({
  imports: [
    UserModule,
    AuthModule,
    DatabaseModule,
    // RedisModule
    // MongooseModule.forRoot('mongodb://localhost:27017/nest'),
  ],
  controllers: [AppController],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard
    // }
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggingInterceptor
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TransformInterceptor
    // }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .with('AppModule')
      .forRoutes('/');
  }
}
