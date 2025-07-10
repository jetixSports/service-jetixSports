// src/payments-history/dto/create-payment-history.dto.ts
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsDate,
  IsOptional,
  Matches,
  Length,
  IsNotEmpty,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class VerifyPaymentHistoryDto {
  @ApiProperty({
    description: "ID del usuario asociado al pago",
    example: "507f1f77bcf86cd799439011",
    minLength: 24,
    maxLength: 24,
    pattern: "^[0-9a-fA-F]{24}$",
  })
  @IsNotEmpty()
  _idUser: string;

  @ApiProperty({
    description: "ID del pago",
    example: "507f1f77bcf86cd799439011",
    minLength: 24,
    maxLength: 24,
    pattern: "^[0-9a-fA-F]{24}$",
  })
  @IsString()
  @IsNotEmpty()
  _idPayment: string;
}
