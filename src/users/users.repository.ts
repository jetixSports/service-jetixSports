import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Users } from "./users.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { SaveUserDto } from "./dto/SaveUser.dto";

@Injectable()
export class UsersRepository {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Users.name, process.env.AUTH_DB)
    private usersModel: Model<Users>
  ) {}
  async findOneByEmail(email: string, ignoreAtt = ["password"]) {
    const options =
      ignoreAtt.length > 0
        ?  ignoreAtt.reduce(
              (acc, item) => ({ ...acc, [item]: 0 }),
              {}
            )
        : {};
    const user = await this.usersModel.findOne({ email }, options);
    return user;
  }
  async updateUser(email: string, updateUserDto: UpdateUserDto) {
    return await this.usersModel.updateOne({ email }, { $set: updateUserDto });
  }
  async existingEmail(email: string) {
    const countUsers = await this.usersModel.countDocuments({ email });
    return countUsers > 0;
  }
  async saveUser(saveUserDto: SaveUserDto) {
    const newUser = new this.usersModel(saveUserDto);
    const user = await newUser.save();
    return {
      statusCode: 200,
      message: "Usuario guardado con exito",
      data: user,
    };
  }
}
