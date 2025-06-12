import { IsString, Matches } from "class-validator";
import { Transform } from 'class-transformer';
export class EmailDto {
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
