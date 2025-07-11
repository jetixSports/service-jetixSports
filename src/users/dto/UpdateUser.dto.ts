import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  MinLength,
  MaxLength,
  Matches,
  IsIn,
} from "class-validator";

export class UpdateUserDto {
  @ApiProperty({
    description: 'ID único del usuario a actualizar',
    example: '507f1f77bcf86cd799439011',
    required: true
  })

  @IsString()
  _id: string;

  @ApiProperty({
    description: 'Nuevo nombre del usuario',
    example: 'María',
    maxLength: 50,
    required: true
  })
  @IsString()
  @MaxLength(50)
  firstName: string;

  @ApiProperty({
    description: 'Nuevo nombre de usuario (único)',
    example: 'maria_2023',
    maxLength: 50,
    required: true,
    pattern: '^[a-zA-Z0-9_]+$'
  })
  @IsString()
  @MaxLength(50)
  username: string;

  @ApiProperty({
    description: 'Nuevo apellido del usuario',
    example: 'González',
    maxLength: 50,
    required: true
  })
  @IsString()
  @MaxLength(50)
  lastName: string;

  @ApiPropertyOptional({
    description: 'Nuevo rol del usuario',
    example: 'user',
    enum: ['admin', 'user', 'moderator'],
    required: false
  })
  @IsOptional()
  @IsString()
  role?: string;
}
