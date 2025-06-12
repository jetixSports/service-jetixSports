import { Transform } from "class-transformer";
import {
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class ValidateTokenDto {


  @IsString()
  token: string|undefined;

  @IsString()
_id: string| unknown;

   @IsString()
    @Matches(/^[a-zA-Z0-9._%+-]{8,15}@/, {
      message: "El correo electrónico debe tener entre 8 y 15 caracteres",
    })
    @Matches(/@(gmail|outlook|hotmail|yahoo)\.com$/, {
      message: "El correo electrónico no cumple con el formato",
    })
    @Transform(({ value }) => value.toLowerCase().trim())
    email: string;




}
