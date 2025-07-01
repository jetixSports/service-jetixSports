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
  
   async existingId(_id: string) {
    const countUsers = await this.usersModel.countDocuments({ _id });
    return countUsers > 0;
  }
  async existingUsername(username: string) {
    const countUsers = await this.usersModel.countDocuments({ username });
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
  // Método para obtener todos los usuarios
  async findAll() {
    return await this.usersModel.find().select("-password"); // Excluyendo la contraseña por defecto
  }

  // Método para encontrar un usuario por ID
  async findOneById(id: string) {
    const user = await this.usersModel.findById(id);
    if (!user) {
      throw new NotFoundException("Usuario no encontrado");
    }
    return user;
  }

  // Método para eliminar un usuario por ID
  async remove(id: string) {
    const result = await this.usersModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException("Usuario no encontrado");
    }
    return {
      statusCode: 200,
      message: "Usuario con ID ${id} eliminado con éxito,"
    };
  }
  async cleanSession(_id:string){
    return await this.usersModel.updateOne({_id},{$set:{tokenSession:''}})
  }
}
