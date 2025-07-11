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
    IsObject
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class FinishedRoundDto {

     @ApiProperty({
        description: 'ID del usuario que finaliza la ronda',
        example: '507f1f77bcf86cd799439011',
        required: true,
        type: String
    })
    @IsString()
    @IsNotEmpty()
    _idUser: string;

    @ApiProperty({
        description: 'ID del torneo al que pertenece la ronda',
        example: '658f1f77bcf86cd799439022',
        required: true,
        type: String
    })@IsString()
    @IsNotEmpty()
    _idTournament: string;


}