import { Controller, OnModuleInit, Get, Param } from '@nestjs/common';
import {
  ClientGrpc,
  Client,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { join } from 'path';
import { grpcClientOptions } from '../grpc-hero.options';

interface IHeroService {
  findOne(data: { id: number }): Observable<any>;
}

@Controller('hero')
export class HeroController implements OnModuleInit {
  @Client(grpcClientOptions) private readonly client: ClientGrpc;
  private heroService: IHeroService;

  onModuleInit() {
    this.heroService = this.client.getService<IHeroService>('HeroService');
  }

  @Get(':id')
  call(@Param() params): Observable<any> {
    console.log('client: call server rpc method')
    return this.heroService.findOne({ id: +params.id });
  }
}
