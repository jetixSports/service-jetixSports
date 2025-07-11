import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Transform } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";
export class UsernameDto {
  @ApiProperty({
      description: 'Nombre de usuario a verificar',
      example: 'maria_2023',
      maxLength: 50,
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
