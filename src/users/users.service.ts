import { Model } from 'mongoose';
import { Injectable, Inject, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto, UpdateUserDto } from './dto';
import * as bcrypt from 'bcryptjs'
@Injectable()
export class UsersService {
  private readonly logger: Logger = new Logger(UsersService.name);
  // constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}
  constructor(
    @Inject('UserModelToken') private readonly userModel: Model<IUser>,
  ) {}

  async findAll(): Promise<IUser[]> {
    return await this.userModel.find().exec();
  }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const hash = bcrypt.hashSync(createUserDto.password, 10) 
    const createUser = new this.userModel({...createUserDto, password: hash});
    return await createUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    return await this.userModel.updateOne({ _id: id }, updateUserDto);
  }

  async findOne(id: string): Promise<IUser> {
    let user = await this.userModel.findById(id).exec()
    const valid = bcrypt.compareSync('19842895', user.password)
    console.log('>>>>>>>>>>>> valid: ', valid)
    return user 
  }

  async delete(id: string): Promise<{}> {
    return await this.userModel.remove({_id: id})
  }
}
