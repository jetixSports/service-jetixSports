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
  @IsOptional()
  @IsString()
  @MaxLength(50)
  firstName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  lastName?: string;

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

  @IsString()
  @IsOptional()
  role?: string;
}
export class FilterUsersDto {
  @IsObject()
  filter:Filter
  
  @IsNumber()
  pagination:number
}
