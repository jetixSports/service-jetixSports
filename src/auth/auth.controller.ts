import { Body, Controller, Post, Req, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Auth } from "src/decorators/auth/auth.decorator";
import { LoginDto } from "./dto/Login.dto";
import { Request } from "express";
import { SignInDto } from "./dto/SignIn.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Auth("NoAuth")
  @Post("login")
  login(@Req() request: Request, @Body(ValidationPipe) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Auth("NoAuth")
  @Post("signIn")
  signIn(@Req() request: Request, @Body(ValidationPipe) signIn: SignInDto) {
    return this.authService.signIn(signIn);
  }
}
