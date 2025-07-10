import { IsNotEmpty, IsString, Length } from "class-validator";
import { Transform, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCurrencyDto {
  @ApiProperty({
    description: "Nombre completo de la moneda",
    example: "Dólar",
    minLength: 2,
    maxLength: 50,
    required: true,
  })
  @IsNotEmpty({ message: "El nombre de la moneda es requerido" })
  @IsString({ message: "El nombre debe ser una cadena de texto" })
  @Length(2, 50, { message: "El nombre debe tener entre 2 y 50 caracteres" })
  @Transform(({ value }) => value.replaceAll(".", "").replaceAll(",", ""))
  name: string;

  @ApiProperty({
    description: "Código ISO de la moneda",
    example: "USD",
    minLength: 1,
    maxLength: 3,
    required: true,
    pattern: "^[A-Z]{3}$",
  })
  @IsNotEmpty({ message: "El código de la moneda es requerido" })
  @IsString({ message: "El código debe ser una cadena de texto" })
  @Length(2, 50, { message: "El código debe tener entre 1 y 3 caracteres" })
  code: string;

  @ApiProperty({
    description: "Símbolo o signo de la moneda",
    examples: ["$", "€", "¥", "£"],
    minLength: 1,
    maxLength: 5,
    required: true,
  })
  @IsNotEmpty({ message: "El nombre corto de la moneda es requerido" })
  @IsString({ message: "El nombre corto debe ser una cadena de texto" })
  @Length(1, 5, {
    message: "El nombre corto debe tener entre 1 y 5 caracteres",
  })
  @Transform(({ value }) => value.replaceAll(".", "").replaceAll(",", ""))
  shortname: string;
}
