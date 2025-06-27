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
  IsArray,
  Min,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";

export class VerifyPayTeamTournamentDto {
  @ApiProperty({ description: "Tournament ID associated with the payment" })
  @IsString()
  @IsNotEmpty()
  _idTournament: string;

  @ApiProperty({ description: "Tournament ID associated with the payment" })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  _idTeam?: string;

  @ApiProperty({ description: "Tournament ID associated with the payment" })
  @IsString()
  @IsNotEmpty()
  _idPayment: string;
}
