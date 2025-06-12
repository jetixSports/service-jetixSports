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
  @IsOptional()
  @IsString()
  @MaxLength(50)
  firstName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  lastName?: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9._%+-]{8,15}@/, {
    message: "El correo electrónico debe tener entre 8 y 15 caracteres",
  })
  @Matches(/@(gmail|outlook|hotmail|yahoo)\.com$/, {
    message: "El correo electrónico no cumple con el formato",
  })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8, { message: "La contraseña debe tener almenos de 8 caracteres" })
  @MaxLength(15, {
    message: "La contraseña no debe tener mas de 15 caracteres",
  })
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\]{};':"\\|,.<>?]).*$/, {
    message: "La contraseña debe tener al menos una mayúscula y un símbolo",
  })
  password?: string;

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
}
