import { IsOptional, IsString, IsEnum } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class FindCurrencyDto {
  @ApiPropertyOptional({
    description: "ID de la moneda",
    example: "507f1f77bcf86cd799439011",
    type: String,
  })
  @IsOptional()
  @IsString()
  _id?: string;

  @ApiPropertyOptional({
    description: "Nombre de la moneda (búsqueda parcial)",
    example: "Dólar",
    type: String,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: "Código ISO de la moneda (búsqueda exacta)",
    example: "USD",
    type: String,
    pattern: "^[A-Z]{3}$",
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({
    description: "Símbolo o abreviatura de la moneda",
    example: "$",
    type: String,
  })
  @IsOptional()
  @IsString()
  shortname?: string;

  @ApiPropertyOptional({
    description: "Estado de la moneda",
    enum: ["active", "inactive"],
    example: "active",
    type: String,
  })
  @IsOptional()
  @IsEnum(["active", "inactive"], {
    message: "El estado debe ser active o inactive",
  })
  status?: string;
}
