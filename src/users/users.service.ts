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

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  // Buscar un usuario por email
  async findOneByEmail(emailDto: EmailDto, ignoreAtt?: string[]) {
    const user = await this.usersRepository.findOneByEmail(emailDto.email, ignoreAtt);
    if (!user) {
      throw new NotFoundException("User with email ${emailDto.email} not found.");
    }
    return user;
  }

  // Actualizar un usuario por email
  async updateUser(emailDto: EmailDto, updateUserDto: UpdateUserDto) {
    const updateState = await this.usersRepository.updateUser(
      emailDto.email,
      updateUserDto
    );

    if (updateState.matchedCount < 1) {
      throw new NotFoundException("User with email ${emailDto.email} not found for update.");
    }
    if (updateState.modifiedCount < 1) {
      throw new NotFoundException("User found, but no changes were applied.");
    }

    return { statusCode: 200, message: "User updated successfully." };
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
      throw new NotFoundException("User with ID ${id} not found.");
    }
    return user;
  }

  // Eliminar un usuario por ID
  async remove(id: string) {
    const deletedUser = await this.usersRepository.remove(id);

    // Si no se eliminó ningún usuario, lanzar excepción
    if (!deletedUser) {
      throw new NotFoundException("User with ID ${id} not found.");
    }

    return {
      statusCode: 200,
      message: "User with ID ${id} successfully deleted.",
    };
  }
  async cleanSession(_id: string) {
    const logoutState = await this.usersRepository.cleanSession(_id)
    if (logoutState.matchedCount == 0)
      throw new NotFoundException('Usuario no encontrado')
    if (logoutState.matchedCount == 0)
      throw new BadRequestException('Usuario ya se encontraba sin session')
    return { statusCode: 200, messaga: "Sesion eliminada con exito" }
  }
  async filter(filterUsersDto: FilterUsersDto) {
    const users= await this.usersRepository.filter(filterUsersDto)
    if(users.length==0)
      throw new NotFoundException("Usuarios no encontrados")
    return {statusCode:200,message:"Usuarios encontrados con exito",data:users}
  }
}

