import { Details } from "./create-payments-detail.dto";
import { IsEnum, IsObject, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

enum TypePay {
  "bank_transfer" = "bank_transfer",
  "binance" = "binance",
  "mobile_payment" = "mobile_payment",
}

export class UpdatePaymentsDetailDto {
  @ApiPropertyOptional({
    description: "Tipo de método de pago",
    enum: TypePay,
    example: "binance",
    required: true,
  })
  @IsOptional()
  @IsString()
  @IsEnum(TypePay)
  typePay?: string;

  @ApiPropertyOptional({
    description: "Detalles específicos del método de pago",
    type: Details,
    required: true,
  })
  @IsOptional()
  @IsObject()
  @Type(() => Details)
  details?: Details;
}
