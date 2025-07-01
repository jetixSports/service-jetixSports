import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { LoginDto } from "./dto/Login.dto";
import { AuthRepository } from "./auth.repository";
import { UsersService } from "src/users/users.service";
import { SignUpDto } from "./dto/SignUp.dto";

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
      role: user.role,
    });
    await this.usersService.updateTokenSession(
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
  async signIn(signInDto: SignUpDto) {
    const existingUserEmail = await this.usersService.existingEmail({
      email: signInDto.email,
    });
    if (existingUserEmail)
      throw new ForbiddenException("Ya existe un usuario con este correo");

    const existingUsername = await this.usersService.existingUsername({
      username: signInDto.username,
    });
    if (existingUsername)
      throw new ForbiddenException(
        "Ya existe un usuario con este nombre de usuario"
      );
    const encryptedPassword = await this.authRepository.encryptPassword(
      signInDto.password
    );
    const user = await this.usersService.saveUser({
      ...signInDto,
      password: encryptedPassword,
    });
    return { ...user, data: {} };
  }
  async logout(_id: string) {
    return await this.usersService.cleanSession(_id);
  }
}
