import { Body, Controller, Post, Req, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { EmailDto } from "./dto/Email.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post("findByEmail")
  findUser(@Req() request: Request, @Body(ValidationPipe) emailDto: EmailDto) {
    return this.usersService.findOneByEmail(emailDto);
  }
}
