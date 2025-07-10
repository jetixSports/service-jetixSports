import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { CreatePaymentsDetailDto, Details } from "./create-payments-detail.dto";
import { IsEnum, IsObject, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

enum TypePay {
  "bank_transfer" = "bank_transfer",
  "binance" = "binance",
  "mobile_payment" = "mobile_payment",
}

export class FindPaymentsDetailDto {
  @ApiPropertyOptional({
    description: "ID del método de pago",
    example: "507f1f77bcf86cd799439011",
    type: String,
  })
  @IsOptional()
  @IsString()
  _id?: string;

  @ApiPropertyOptional({
    description: "ID del usuario asociado al método de pago",
    example: "507f1f77bcf86cd799439012",
    type: String,
  })
  @IsOptional()
  @IsString()
  _idUser?: string;

  @ApiPropertyOptional({
    description: "Tipo de método de pago",
    enum: TypePay,
    example: "binance",
    type: String,
  })
  @IsOptional()
  @IsString()
  @IsEnum(TypePay)
  typePay?: string;

  @ApiPropertyOptional({
    description: "Detalles específicos del método de pago",
    type: Details,
  })
  @IsOptional()
  @IsObject()
  @Type(() => Details)
  details?: Details;
}
