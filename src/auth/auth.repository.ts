import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login/Login.repository.dto';

@Injectable()
export class AuthRepository {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password,_id,token }: LoginDto){
    
    console.log(email, password,_id,token);
    
    const isPasswordValid = await bcrypt.compare(password, '');
    if (!isPasswordValid)
      throw new UnauthorizedException('Contraseña incorrecta');

    return false;
  }
 
}
