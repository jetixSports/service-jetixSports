import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from './users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @InjectModel(Users.name, 'usersDB') private userModel: Model<Users>
  ) {}

  async findOneByEmail(email: string){

    // if (!user) throw new NotFoundException('User not found');
    return 123
  }

}
