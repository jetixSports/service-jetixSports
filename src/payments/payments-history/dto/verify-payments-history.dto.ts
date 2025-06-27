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
  @ApiProperty({ description: "User ID associated with the payment" })
  @IsString()
  @IsNotEmpty()
  _idUser: string;

  @ApiProperty({ description: "Tournament ID associated with the payment" })
  @IsString()
  @IsNotEmpty()
  _idPayment: string;
}
