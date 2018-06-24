import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Logger, HttpStatus, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { _throw } from "rxjs/observable/throw";

/**
 * @description 统一拦截错误进行处理
 *
 * @export
 * @class ErrorsInterceptor
 *
 * @implements {NestInterceptor}
 */
@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    return call$.pipe(
      catchError(err => {
        const name = `${context.getClass().name}:${context.getHandler().name}`;
        const logger = new Logger(name);
        logger.error(err.message, err.stack);
        throw new HttpException('Message', HttpStatus.BAD_GATEWAY);
        // 按官方Demo这里有问题, _throw 无法正确返回
        // _throw(new HttpException('Message', HttpStatus.BAD_GATEWAY))
      }),
    );
  }
}
