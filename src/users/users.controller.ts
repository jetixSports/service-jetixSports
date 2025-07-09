import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  Get,
  Delete,
  Param,
  NotFoundException,
  Put,
  UseInterceptors,
  UploadedFile,
  Req,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { EmailDto } from "./dto/Email.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { SaveUserDto } from "./dto/SaveUser.dto";
import { UsernameDto } from "./dto/Username.dto";
import { FilterUsersDto } from "./dto/FilterUsers.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { Auth } from "src/decorators/auth/auth.decorator";
import { Request } from "express";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("findByEmail")
  async findOneByEmail(emailDto: EmailDto, ignoreAtt?: string[]) {
    return this.usersService.findOneByEmail(emailDto, ignoreAtt);
  }

  @Post("existingUsername")
  async existingUsername(@Body(ValidationPipe) usernameDto: UsernameDto) {
    return this.usersService.existingUsername(usernameDto);
  }

  @Post()
  async create(@Body(ValidationPipe) createUserDto: SaveUserDto) {
    return this.usersService.saveUser(createUserDto);
  }

  @Post("filter")
  async filter(@Body(ValidationPipe) filterUsersDto: FilterUsersDto) {
    return this.usersService.filter(filterUsersDto);
  }

  @Post("getNames")
  async getNames(@Body(ValidationPipe) filter: {_id:string[]}) {
    return this.usersService.getNames(filter);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
  }

  @Post("updateUser")
  async updateUser(@Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(updateUserDto);
  }
  
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }

  @Auth("Auth")
  @Put('changeImage')
    @UseInterceptors(FileInterceptor('file'))
    changeImage(
      @Req() request: Request,
      @UploadedFile() file: Express.Multer.File,
    ) {
      return this.usersService.changeImage(file, request.userData?._id??'')
    }
}
