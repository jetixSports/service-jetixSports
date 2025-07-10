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

export class CreatePaymentHistoryDto {
  @ApiProperty({
    description: "ID del usuario asociado al pago",
    example: "507f1f77bcf86cd799439011",
    minLength: 24,
    maxLength: 24,
    pattern: "^[0-9a-fA-F]{24}$",
  })
  @IsString()
  @IsNotEmpty()
  _idUser: string;

  @ApiProperty({
    description: "ID del torneo asociado al pago",
    example: "507f1f77bcf86cd799439012",
    minLength: 24,
    maxLength: 24,
    pattern: "^[0-9a-fA-F]{24}$",
  })
  @IsString()
  @IsNotEmpty()
  _idTournament: string;

  @ApiProperty({
    description: "Código de transacción (exactamente 6 dígitos)",
    example: "123456",
    minLength: 6,
    maxLength: 6,
    pattern: "^[0-9]{6}$",
  })
  @IsString()
  @Length(6, 6, { message: "Transaction code must be exactly 6 digits" })
  @Matches(/^\d+$/, { message: "Transaction code must contain only digits" })
  transactionCode: string;

  @ApiProperty({
    description: "ID de los detalles del receptor del pago",
    example: "507f1f77bcf86cd799439013",
    minLength: 24,
    maxLength: 24,
    pattern: "^[0-9a-fA-F]{24}$",
  })
  @IsString()
  @IsNotEmpty()
  _idReceiveDetails: string;

  @ApiProperty({
    description: "Tasa de cambio aplicada (número positivo)",
    example: 1.0,
    minimum: 0.0001,
    type: Number,
    format: "decimal",
  })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  amount: number;

  @ApiProperty({
    description: "Tasa de cambio aplicada (número positivo)",
    example: 1.0,
    minimum: 0.0001,
    type: Number,
    format: "decimal",
  })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  rateExchange: number;

  @ApiProperty({
    description: "Código de moneda ",
    example: "USD",
    minLength: 3,
    maxLength: 3,
    pattern: "^[A-Z]{3}$",
  })
  @IsString()
  @IsNotEmpty()
  currency: string;
}
