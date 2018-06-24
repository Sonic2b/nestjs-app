import {
  Logger,
  Injectable,
  NestMiddleware,
  MiddlewareFunction,
} from '@nestjs/common';
const logger = new Logger('Middleware:Logger');
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  resolve(name: string): MiddlewareFunction {
    return (req, res, next) => {
      logger.log(`${name}: ${req.method} ${req.url}`);
      next();
    };
  }
}
