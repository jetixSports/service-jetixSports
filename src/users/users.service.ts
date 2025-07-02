import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { EmailDto } from "./dto/Email.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { SaveUserDto } from "./dto/SaveUser.dto";
import { UsernameDto } from "./dto/Username.dto";
import { FilterUsersDto } from "./dto/FilterUsers.dto";
import { ImagesService } from "src/utils/images/images.service";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository,
    private readonly imagesService: ImagesService
  ) { }

  // Buscar un usuario por email
  async findOneByEmail(emailDto: EmailDto, ignoreAtt?: string[]) {
    const user = await this.usersRepository.findOneByEmail(
      emailDto.email,
      ignoreAtt
    );
    if (!user) {
      throw new NotFoundException("Usuario no encontrado");
    }
    return user;
  }

  // Actualizar un usuario por email
  async updateUser(updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneById(updateUserDto._id);
    if (updateUserDto.username != user.username) {
      const existingUsername = await this.existingUsername({
        username: updateUserDto.username,
      });
      if (existingUsername)
        throw new BadRequestException("Este nombre de usuario ya existe");
    }
    const updateState = await this.usersRepository.updateUser(updateUserDto);

    if (updateState.matchedCount < 1) {
      throw new NotFoundException("Usuario no encontrado");
    }
    if (updateState.modifiedCount < 1) {
      throw new NotFoundException("Usuario encontrado pero no actualizado");
    }

    return { statusCode: 200, message: "Usuario actualizado con exito" };
  }
  async updateTokenSession(
    { email }: { email: string },
    { tokenSession }: { tokenSession: string }
  ) {
    const updateState = await this.usersRepository.updateTokenSession(
      email,
      tokenSession
    );

    if (updateState.matchedCount < 1) {
      throw new NotFoundException("Usuario no encontrado");
    }
    if (updateState.modifiedCount < 1) {
      throw new NotFoundException("Usuario encontrado pero no actualizado");
    }

    return { statusCode: 200, message: "Usuario actualizado con exito" };
  }
  // Verificar si un email existe
  async existingEmail(emailDto: EmailDto) {
    return await this.usersRepository.existingEmail(emailDto.email);
  }

  async existingId({ _id }: { _id: string }) {
    return await this.usersRepository.existingId(_id);
  }

  // Verificar si un nombre de usuario existe
  async existingUsername(usernameDto: UsernameDto) {
    return await this.usersRepository.existingUsername(usernameDto.username);
  }

  // Guardar un nuevo usuario
  async saveUser(saveUserDto: SaveUserDto) {
    return await this.usersRepository.saveUser(saveUserDto);
  }

  // Buscar todos los usuarios
  async findAll() {
    return await this.usersRepository.findAll();
  }

  // Buscar un usuario por ID
  async findOneById(id: string) {
    const user = await this.usersRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException("Usuario no encontrado");
    }
    return user;
  }

  // Eliminar un usuario por ID
  async remove(id: string) {
    const deletedUser = await this.usersRepository.remove(id);
    if (deletedUser.matchedCount == 0)
      throw new NotFoundException("Usuario no encontrado");
    if (deletedUser.matchedCount == 0)
      throw new BadRequestException("Usuario ya eliminido anteriormente");

    return {
      statusCode: 200,
      message: "Usuario eliminado con exito",
    };
  }
  async cleanSession(_id: string) {
    const logoutState = await this.usersRepository.cleanSession(_id);
    if (logoutState.matchedCount == 0)
      throw new NotFoundException("Usuario no encontrado");
    if (logoutState.matchedCount == 0)
      throw new BadRequestException("Usuario ya se encontraba sin session");
    return { statusCode: 200, messaga: "Sesion eliminada con exito" };
  }
  async filter(filterUsersDto: FilterUsersDto) {
    const users = await this.usersRepository.filter(filterUsersDto);
    if (users.length == 0)
      throw new NotFoundException("Usuarios no encontrados");
    return {
      statusCode: 200,
      message: "Usuarios encontrados con exito",
      data: users,
    };
  }
  async changeImage(file: Express.Multer.File, _id: string) {
    const saveImage = await this.imagesService.create(
      _id,
      { type: "profile" },
      file
    );
    const updateImage=await this.usersRepository.updateImage(_id,saveImage.data._id+"")
    if (updateImage.matchedCount == 0)
      throw new NotFoundException("Usuario no encontrado");
   
    return { statusCode: 200, message: "Usuario actualizado con exito" ,data:{_idImg:saveImage.data._id}};
  }


}


