import {
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class ComparePasswordDto {
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
  passwordCompare: string;
}
