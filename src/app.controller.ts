import { Get, Controller, UseInterceptors } from '@nestjs/common';
import { ErrorsInterceptor } from './common/interceptors';

@UseInterceptors(ErrorsInterceptor)
@Controller()
export class AppController {
  @Get('health')
  health() {
    return {
      health: 'ok',
    };
  }

  @Get('info')
  info() {
    return {
      status: 'UP',
    };
  }
}
