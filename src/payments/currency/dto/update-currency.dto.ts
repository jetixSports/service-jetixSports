import { PartialType } from "@nestjs/mapped-types";
import { CreateCurrencyDto } from "./create-currency.dto";
import { IsOptional, IsEnum } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateCurrencyDto extends PartialType(CreateCurrencyDto) {
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
