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
  IsObject,
  IsNumber,
} from "class-validator";
class Filter {
  @ApiPropertyOptional({
    description: 'Filtrar por nombre del usuario',
    example: 'Juan',
    maxLength: 50,
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  firstName?: string;

    @ApiPropertyOptional({
    description: 'Filtrar por apellido del usuario',
    example: 'Pérez',
    maxLength: 50,
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  lastName?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por correo electrónico',
    example: 'juan.perez@gmail.com',
    required: false,
    pattern: '^[a-zA-Z0-9._%+-]{8,15}@(gmail|outlook|hotmail|yahoo)\\.com$'
  })
  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9._%+-]{8,15}@/, {
    message: "El correo electrónico debe tener entre 8 y 15 caracteres",
  })
  @Matches(/@(gmail|outlook|hotmail|yahoo)\.com$/, {
    message: "El correo electrónico no cumple con el formato",
  })
  @Transform(({ value }) => value.toLowerCase().trim())
  email?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por rol del usuario',
    example: 'admin',
    required: false,
    enum: ['admin', 'user', 'organizer']
  })
  @IsString()
  @IsOptional()
  role?: string;
}
export class FilterUsersDto {
  @ApiProperty({
    description: 'Objeto con los filtros de búsqueda',
    type: Filter
  })
  @IsObject()
  filter:Filter
  
  @ApiProperty({
    description: 'Número de página para la paginación',
    example: 1,
    minimum: 1
  })
  @IsNumber()
  pagination:number
}
