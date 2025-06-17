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
  @IsOptional()
  @IsString()
  @MaxLength(50)
  firstName: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  lastName: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9._%+-]{8,15}@/, {
    message: "El correo electrónico debe tener entre 8 y 15 caracteres",
  })
  @Matches(/@(gmail|outlook|hotmail|yahoo)\.com$/, {
    message: "El correo electrónico no cumple con el formato",
  })
  @Transform(({ value }) => value.toLowerCase().trim())

  email: string;

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

  @IsString()
  @IsOptional()
  role?: string;

  @IsOptional()
  @IsString()
  _idImg?: string;

  @IsOptional()
  @IsString()
  @IsIn(["active", "inactive", "suspended", "delete"])
  status?: string;

  @IsOptional()
  @IsString()
  tokenSession?: string;

  @IsOptional()
  @IsString()
  tokenNotification?: string;

  @IsNotEmpty({ message: 'El username no puede estar vacío' })
  @IsString({ message: 'El username debe ser una cadena de texto' })
  @MinLength(4, { message: 'El username debe tener al menos 4 caracteres' })
  @MaxLength(20, { message: 'El username no puede exceder los 20 caracteres' })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'El username solo puede contener letras, números y guiones bajos (_)'
  })
  username: string;
}
