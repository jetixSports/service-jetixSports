import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { LoginDto } from "./dto/Login.dto";
import { AuthRepository } from "./auth.repository";
import { UsersService } from "src/users/users.service";
import { SignInDto } from "./dto/SignIn.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly usersService: UsersService
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneByEmail(
      {
        email: loginDto.email,
      },
      []
    );
    const isPasswordValid = await this.authRepository.comparePasswords({
      password: loginDto.password,
      passwordCompare: user.password,
    });
    if (!isPasswordValid) throw new ForbiddenException("Contraseña incorrecta");
    const isTokenValid = await this.authRepository.validateSessionToken({
      token: user.tokenSession,
      email: user.email,
      _id: user._id,
    });
    if (isTokenValid)
      throw new UnauthorizedException("Ya posees una sesión activa");
    const generateToken = await this.authRepository.generateToken({
      email: user.email,
      _id: user._id,
    });
    await this.usersService.updateUser(
      { email: user.email },
      { tokenSession: generateToken }
    );
    const userSession = await this.usersService.findOneByEmail({
      email: loginDto.email,
    });
    return {
      statusCode: 200,
      message: "Has iniciado sesión con exito",
      data: userSession,
    };
  }
  async signIn(signInDto: SignInDto) {
    const existingUser = await this.usersService.existingEmail({
      email: signInDto.email,
    });
    if (existingUser)
      throw new ForbiddenException("Ya existe un usuario con este correo");
    const encryptedPassword = await this.authRepository.encryptPassword(
      signInDto.password
    );
    return await this.usersService.saveUser({
      ...signInDto,
      password: encryptedPassword,
    });
  }
}
