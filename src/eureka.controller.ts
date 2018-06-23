import { Get, Controller } from '@nestjs/common';

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
}
