import { Get, Post, Put, Delete, Patch } from '@nestjs/common';
import { Param, Query, Body } from '@nestjs/common';
import { Logger, Inject, Controller } from '@nestjs/common';
import { NotImplementedException } from '@nestjs/common';
import { HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { HttpExceptionFilter } from '../common/filters';
import { ValidationPipe, ParseIntPipe } from '../common/pipes';
import { RolesGuard } from '../common/guards';
import { Roles } from '../common/decorators/roles.decorator';
import {
  TransformInterceptor,
  ErrorsInterceptor,
} from '../common/interceptors';
import { IUser } from './interfaces/user.interface';
import { ApiUseTags, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';

/**
 *
 *
 * @export
 * @class UsersController
 */
@ApiUseTags('users')
@Controller('users')
@UseInterceptors(TransformInterceptor)
@UseGuards(RolesGuard)
export class UsersController {
  private readonly logger: Logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

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
  findOne(@Param('id') id): Promise<IUser> {
    return this.usersService.findOne(id);
  }

  @HttpCode(201)
  @Post()
  create(
    @Body(new ValidationPipe())
    createUserDto: CreateUserDto,
  ): Promise<IUser> {
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
