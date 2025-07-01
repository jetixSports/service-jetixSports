import {
  Body,
  Controller,
  Post,
  Req,
  ValidationPipe,
  Get,     
  Put,     
  Patch,   
  Delete,  
  Param,   
  NotFoundException, 
  HttpStatus, 
  HttpCode 
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { EmailDto } from "./dto/Email.dto"; 
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { SaveUserDto } from "./dto/SaveUser.dto";
import { UsernameDto } from "./dto/Username.dto";
import { FilterUsersDto } from "./dto/FilterUsers.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // **Endpoint existente (Ver por Email)**
  @Post("findByEmail")
  async findOneByEmail(emailDto: EmailDto, ignoreAtt?: string[]) {
    return this.usersService.findOneByEmail(emailDto, ignoreAtt);
  }

  @Post("existingUsername") // POST para body, GET para query. Si prefieres GET: @Get("existingUsername")
  async existingUsername(@Body(ValidationPipe) usernameDto: UsernameDto) { // Si usas POST para UsernameDto en body
  // async existingUsername(@Query(ValidationPipe) usernameDto: UsernameDto) { // Si usas GET para UsernameDto en query
    return this.usersService.existingUsername(usernameDto);
  }

  // **1. Crear Usuario (Create)**
  // POST /users
  @Post()
  @HttpCode(HttpStatus.CREATED) // Responde con 201 Created al éxito
  async create(@Body(ValidationPipe) createUserDto: SaveUserDto) {
    return this.usersService.saveUser(createUserDto);
  }

   @Post('filter')
  async filter(@Body(ValidationPipe) filterUsersDto: FilterUsersDto) {
    return this.usersService.filter(filterUsersDto);
  }



  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  // **3. Ver Usuario por ID (Read One)**
  // GET /users/:id
  @Get(":id")
  async findOne(@Param("id") id: string) {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
  }

  // **4. Actualizar Usuario (Update - PATCH para actualizaciones parciales)**
  // PATCH /users/:id
  // Se recomienda PATCH para actualizaciones parciales. Si necesitas reemplazo completo, usa PUT.
   @Patch("updateUser")
  async updateUser(
    @Body(ValidationPipe) emailDto: EmailDto, // Espera el email en el cuerpo para identificar
    @Body(ValidationPipe) updateUserDto: UpdateUserDto // Espera los datos a actualizar
  ) {
    // Es crucial que el email esté presente en el body para identificar el usuario a actualizar.
    // Aquí combinamos ambos DTOs para pasarlos al servicio de la manera que lo espera.
    return this.usersService.updateUser(emailDto, updateUserDto);
  }

  // **5. Eliminar Usuario (Delete)**
  // DELETE /users/:id
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT) // Responde con 204 No Content al éxito de eliminación
  async remove(@Param("id") id: string) {
    const result = await this.usersService.remove(id);
    if (!result) { // Asumiendo que el servicio devuelve true/false o un objeto si se eliminó
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    // No Content para DELETE exitoso sin cuerpo de respuesta.
  }
}