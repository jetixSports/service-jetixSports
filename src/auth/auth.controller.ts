import { Body, Controller, Post, Req, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from 'src/decorators/auth/auth.decorator';
import { LoginDto } from './dto/login/Login.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Auth('NoAuth')
  @Post('login')
  login(@Req() request: Request, @Body(ValidationPipe) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}