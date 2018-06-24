import {
  Get,
  Controller,
  HttpException,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { ErrorsInterceptor } from './common/interceptors';

@UseInterceptors(ErrorsInterceptor)
@Controller()
export class EurekaController {
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

  @Get('demo')
  demo() {
    throw new HttpException('Exception Demo', HttpStatus.BAD_REQUEST);
  }
}
