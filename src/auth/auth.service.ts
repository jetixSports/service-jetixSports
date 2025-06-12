import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login/Login.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
  ) {}

  async login(loginDto: LoginDto){
    // if (!user) throw new NotFoundException('User not found');

    // const user = await this.authRepository.login(loginDto);
    // if (!user) throw Error('Error finding user');
    return {}
  }

}
