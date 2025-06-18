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
  IsNotEmpty,
} from "class-validator";

export class SignUpDto {
  @ApiProperty({description: 'Nombre del Usuario',example:"Usuario"})
  @IsString()
  @MaxLength(50)
  firstName: string;

  @ApiProperty({description: 'Apellido del Usuario',example:"Torres"})
  @IsString()
  @MaxLength(50)
  lastName: string;

  @ApiProperty({description: 'Correo del Usuario',example:"Usuario@123"})
  @IsString()
  @Matches(/^[a-zA-Z0-9._%+-]{8,15}@/, {
    message: "El correo electrónico debe tener entre 8 y 15 caracteres",
  })
  @Matches(/@(gmail|outlook|hotmail|yahoo)\.com$/, {
    message: "El correo electrónico no cumple con el formato",
  })
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;

  @ApiProperty({description: 'Contraseña del Usuario', example:'usuario@gmail.com'})
  @IsString()
  @MinLength(8, { message: "La contraseña debe tener almenos de 8 caracteres" })
  @MaxLength(15, {
    message: "La contraseña no debe tener mas de 15 caracteres",
  })
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\]{};':"\\|,.<>?]).*$/, {
    message: "La contraseña debe tener al menos una mayúscula y un símbolo",
  })
  password: string;
  
  @ApiPropertyOptional({description: 'Token de movil para las notificaciones',example:"eyJhbGciOiJIUzI1NiIsInR5csCI6IkpXVCJ9.eyJlbWFpbCI6Imp1c3RpbnZlZ2FzMTRAZ21haWwuY29tIiwiX2lkIjoiNjg0YjYzZmM3YzMzZjB"})
  @IsOptional()
  @IsString()
  tokenNotification?: string;

  @ApiProperty({description: 'Tag de identificación del Usuario',example:"Usuario_12"})
  @IsNotEmpty({ message: 'El username no puede estar vacío' })
  @IsString({ message: 'El username debe ser una cadena de texto' })
  @MinLength(4, { message: 'El username debe tener al menos 4 caracteres' })
  @MaxLength(20, { message: 'El username no puede exceder los 20 caracteres' })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'El username solo puede contener letras, números y guiones bajos (_)'
  })
  username: string;
}
