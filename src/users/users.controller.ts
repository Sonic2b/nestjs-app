import {
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Param,
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  NotImplementedException,
  Logger,
  Query,
  Inject,
  OnModuleInit
} from '@nestjs/common';
import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { HttpExceptionFilter } from '../common/filters';
import { ValidationPipe, ParseIntPipe } from '../common/pipe';
import { RolesGuard } from '../common/guards';
import { Roles } from '../common/decorator/roles.decorator';
import {
  LoggingInterceptor,
  TransformInterceptor,
  ErrorsInterceptor,
} from '../common/interceptor';
import { IUser } from './interfaces/user.interface';
import { ApiUseTags, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import { SHARED_VALUE_PROVIDER } from '../constants';
import { SharedClass } from '../shared/shared.providers'
import { Client, ClientGrpc } from '@nestjs/microservices';
import { grpcClientOptions } from 'grpc-client.options';
import { Observable } from 'rxjs';

interface IHeroService {
  findOne(data: {id: number}): Observable<any>;
}

/**
 *
 *
 * @export
 * @class UsersController
 */
@ApiUseTags('users')
@Controller('users')
@UseInterceptors(LoggingInterceptor)
@UseInterceptors(TransformInterceptor)
@UseGuards(RolesGuard)
export class UsersController implements OnModuleInit {
  private readonly logger: Logger = new Logger(UsersController.name)

  @Client(grpcClientOptions) private readonly grpcClient: ClientGrpc;
  private heroService: IHeroService;

  constructor(
    private readonly usersService: UsersService, 
    @Inject(SHARED_VALUE_PROVIDER) private sharedValue: string,
    private readonly sharedClass: SharedClass
  ) {}

  onModuleInit() {
    this.heroService = this.grpcClient.getService<IHeroService>('HeroService') 
  }
  /**
   *
   *
   * @returns {Promise<IUser[]>}
   * @memberof UsersController
   */
  @Get()
  findAll(): Promise<IUser[]> {
    return this.usersService.findAll();
  }

  @Get('shared')
  getShared() {
    return {
      value: 'value',
      class: this.sharedClass.getEnv()
    }
  }

  @Get('grpc')
  getHeroGrpc() {
    this.logger.log('access hero grpc method')
    console.log(this.heroService)
    return this.heroService.findOne({id: 1})
  }

  @Get(':id')
  @Roles('admin')
  @ApiImplicitParam({
    name: 'id',
    description: 'user id',
    required: true,
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created',
  })
  findOne(@Param('id') id, @Query('space') space): Promise<IUser> {
    this.logger.log(`${id} space: ${space}`);
    this.logger.log(`shared value: ${this.sharedValue}`)
    return this.usersService.findOne(id);
  }

  @HttpCode(201)
  @Post()
  create(
    @Body(new ValidationPipe())
    createUserDto: CreateUserDto,
  ): Promise<IUser> {
    // this.logger.log('[controller:user] create')//, createUserDto);
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id') id,
    @Body(new ValidationPipe())
    updateUserDto: UpdateUserDto,
  ): Promise<{}> {
    this.logger.log(`${this.update.name} ${arguments}`);
    return this.usersService.update(id, updateUserDto);
  }

  @Patch()
  @UseFilters(HttpExceptionFilter)
  patch(): boolean {
    throw new NotImplementedException();
  }

  @Delete(':id')
  // @UseInterceptors(ErrorsInterceptor)
  delete(@Param('id') id): Promise<{}> {
    // response 'internal server error'
    // throw new Error('Not implemented')
    return this.usersService.delete(id);
  }

}
