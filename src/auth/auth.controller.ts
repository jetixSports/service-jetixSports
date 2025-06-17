import { Body, Controller, Post, Req, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Auth } from "src/decorators/auth/auth.decorator";
import { LoginDto } from "./dto/Login.dto";
import { Request } from "express";
import { SignUpDto } from "./dto/SignUp.dto";
import { Permissions } from "src/decorators/permissions/permissions.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Auth("NoAuth")
  @Post("login")
  login(@Req() request: Request, @Body(ValidationPipe) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Auth("NoAuth")
  @Post("signUp")
  signUp(@Req() request: Request, @Body(ValidationPipe) signUpDto: SignUpDto) {
    return this.authService.signIn(signUpDto);
  }
}
