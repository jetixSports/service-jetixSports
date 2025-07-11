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
  @ApiProperty({
    description: 'ID del torneo asociado al pago',
    example: '507f1f77bcf86cd799439011',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  _idTournament: string;

  @ApiProperty({
    description: 'ID del equipo asociado al pago (opcional)',
    example: '658f1f77bcf86cd799439022',
    required: false
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  _idTeam?: string;

  @ApiProperty({
    description: 'ID del pago a verificar',
    example: 'pay_123456789',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  _idPayment: string;
}
