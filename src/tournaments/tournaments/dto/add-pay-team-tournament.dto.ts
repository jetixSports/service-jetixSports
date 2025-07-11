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
    Min
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class AddPayTeamTournamentDto {
    @ApiProperty({
        description: 'ID del torneo al que se asocia el pago',
        example: '507f1f77bcf86cd799439011',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    _idTournament: string;
    @ApiProperty({
        description: 'ID del equipo que realiza el pago',
        example: '658f1f77bcf86cd799439022',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    _idTeam: string;


    @ApiProperty({
        description: 'ID único del pago registrado',
        example: '55af1f77bcf86cd799439033',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    _idPayment: string;
}