import {
  Body,
  Controller,
  Post,
  Patch, // Importamos Patch para la actualización
  HttpCode, // Para especificar códigos de estado HTTP
  HttpStatus, // Para usar códigos de estado HTTP como HttpStatus.NO_CONTENT
  NotFoundException,
  ValidationPipe,
  Query // Para capturar parámetros de consulta como ignoreAtt
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { EmailDto } from "./dto/Email.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { SaveUserDto } from "./dto/SaveUser.dto";
import { UsernameDto } from "./dto/Username.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // --- Endpoints basados en UsersService ---

  // 1. findOneByEmail: Buscar usuario por email
  // POST /users/findByEmail
  // Utiliza POST para enviar el email en el cuerpo, que es más seguro para datos sensibles.
  @Post("findByEmail")
  async findUser(@Body(ValidationPipe) emailDto: EmailDto, @Query('ignoreAtt') ignoreAtt?: string[]) {
    return this.usersService.findOneByEmail(emailDto, ignoreAtt);
  }

  // 2. updateUser: Actualizar un usuario existente
  // PATCH /users/updateUser
  // Usamos PATCH porque es una actualización parcial basada en email.
  @Patch("updateUser")
  async updateUser(
    @Body(ValidationPipe) emailDto: EmailDto, // Espera el email en el cuerpo para identificar
    @Body(ValidationPipe) updateUserDto: UpdateUserDto // Espera los datos a actualizar
  ) {
    // Es crucial que el email esté presente en el body para identificar el usuario a actualizar.
    // Aquí combinamos ambos DTOs para pasarlos al servicio de la manera que lo espera.
    return this.usersService.updateUser(emailDto, updateUserDto);
  }

  // 3. existingEmail: Verificar si un email ya existe
  // GET /users/existingEmail?email=test@example.com
  // Usamos GET con un parámetro de consulta (query parameter) para el email.
  @Post("existingEmail") // POST para body, GET para query. Si prefieres GET: @Get("existingEmail")
  async existingEmail(@Body(ValidationPipe) emailDto: EmailDto) { // Si usas POST para EmailDto en body
  // async existingEmail(@Query(ValidationPipe) emailDto: EmailDto) { // Si usas GET para EmailDto en query
    return this.usersService.existingEmail(emailDto);
  }

  // 4. existingUsername: Verificar si un nombre de usuario ya existe
  // GET /users/existingUsername?username=testuser
  // Usamos GET con un parámetro de consulta para el username.
  @Post("existingUsername") // POST para body, GET para query. Si prefieres GET: @Get("existingUsername")
  async existingUsername(@Body(ValidationPipe) usernameDto: UsernameDto) { // Si usas POST para UsernameDto en body
  // async existingUsername(@Query(ValidationPipe) usernameDto: UsernameDto) { // Si usas GET para UsernameDto en query
    return this.usersService.existingUsername(usernameDto);
  }

  // 5. saveUser: Guardar (crear) un nuevo usuario
  // POST /users/save
  // O simplemente POST /users si sigues una convención más RESTful para crear.
  @Post("save")
  @HttpCode(HttpStatus.CREATED) // Responde con 201 Created al éxito
  async saveUser(@Body(ValidationPipe) saveUserDto: SaveUserDto) {
    return this.usersService.saveUser(saveUserDto);
  }
}
