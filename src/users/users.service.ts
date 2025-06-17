import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { EmailDto } from "./dto/Email.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { SaveUserDto } from "./dto/SaveUser.dto";
import { UsernameDto } from "./dto/Username.dto";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findOneByEmail({ email }: EmailDto, ignoreAtt?: string[]) {
    const user = await this.usersRepository.findOneByEmail(email, ignoreAtt);
    if (!user) throw new NotFoundException("Usuario no encontrado");
    return user;
  }
  async updateUser({ email }: EmailDto, updateUser: UpdateUserDto) {
    const updateState = await this.usersRepository.updateUser(
      email,
      updateUser
    );
    if (updateState.matchedCount < 1)
      throw new NotFoundException("Usuario a actualizar no encontrado");
    if (updateState.modifiedCount < 1)
      throw new NotFoundException("Usuario encontrado, pero no actualizado");
    return { statusCode: 200, message: "Usuario actualizado con exito" };
  }
  async existingEmail({ email }: EmailDto) {
    return await this.usersRepository.existingEmail(email);
  }
  async existingUsername({ username }: UsernameDto) {
    return await this.usersRepository.existingUsername(username);
  }
  async saveUser(saveUserDto: SaveUserDto) {
    return await this.usersRepository.saveUser(saveUserDto);
  }
}
