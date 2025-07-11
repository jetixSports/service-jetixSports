import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  MinLength,
  MaxLength,
  Matches,
  IsIn,
  IsNotEmpty,
} from "class-validator";

export class SaveUserDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Carlos',
    maxLength: 50,
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  firstName: string;

  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Martínez',
    maxLength: 50,
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  lastName: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'usuario.ejemplo@gmail.com',
    required: true,
    pattern: '^[a-zA-Z0-9._%+-]{8,15}@(gmail|outlook|hotmail|yahoo)\\.com$'
  })
  @IsString()
  @Matches(/^[a-zA-Z0-9._%+-]{8,15}@/, {
    message: "El correo electrónico debe tener entre 8 y 15 caracteres",
  })
  @Matches(/@(gmail|outlook|hotmail|yahoo)\.com$/, {
    message: "El correo electrónico no cumple con el formato",
  })
  @Transform(({ value }) => value.toLowerCase().trim())

  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'Passw0rd!',
    minLength: 8,
    maxLength: 15,
    required: false,
    pattern: '^(?=.*[A-Z])(?=.*[!@#$%^&*]).*$'
  })
  @IsOptional()
  @IsString()
  @MinLength(8, { message: "La contraseña debe tener almenos de 8 caracteres" })
  @MaxLength(15, {
    message: "La contraseña no debe tener mas de 15 caracteres",
  })
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\]{};':"\\|,.<>?]).*$/, {
    message: "La contraseña debe tener al menos una mayúscula y un símbolo",
  })
  password: string;

  @ApiPropertyOptional({
    description: 'Rol del usuario',
    example: 'user',
    enum: ['admin', 'user', 'organizer'],
    required: false
  })
  @IsString()
  @IsOptional()
  role?: string;

  @ApiPropertyOptional({
    description: 'ID de la imagen de perfil',
    example: '65d8f1f77bcf86cd799439011',
    required: false
  })
  @IsOptional()
  @IsString()
  _idImg?: string;


  @ApiPropertyOptional({
    description: 'Estado de la cuenta',
    example: 'active',
    enum: ['active', 'inactive', 'suspended', 'delete'],
    required: false
  })
  @IsOptional()
  @IsString()
  @IsIn(["active", "inactive", "suspended", "delete"])
  status?: string;

  @ApiProperty({
    description: 'Nombre de usuario único',
    example: 'usuario_123',
    minLength: 4,
    maxLength: 20,
    required: true,
    pattern: '^[a-zA-Z0-9_]+$'
  })
  @IsNotEmpty({ message: 'El username no puede estar vacío' })
  @IsString({ message: 'El username debe ser una cadena de texto' })
  @MinLength(4, { message: 'El username debe tener al menos 4 caracteres' })
  @MaxLength(20, { message: 'El username no puede exceder los 20 caracteres' })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'El username solo puede contener letras, números y guiones bajos (_)'
  })
  username: string;
}
