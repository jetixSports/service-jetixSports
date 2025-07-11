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

export class InscribeTeamDto {

      @ApiProperty({
        description: 'ID del usuario que realiza la inscripción',
        example: '507f1f77bcf86cd799439011',
        required: true
    })@IsString()
    @IsNotEmpty()
    _idUser: string;

    @ApiProperty({
        description: 'ID del torneo donde se inscribe el equipo',
        example: '658f1f77bcf86cd799439022',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    _idTournament: string;

    @ApiProperty({
        description: 'ID del equipo que se inscribe en el torneo',
        example: '55af1f77bcf86cd799439033',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    _idTeam: string;


    @ApiProperty({
        description: 'Lista de IDs de los jugadores miembros del equipo',
        example: ['5f8d3b5b3b3b3b3b3b3b3b3d', '5f8d3b5b3b3b3b3b3b3b3b3e'],
        required: true,
        minItems: 1
    })
    @IsArray()
    @IsString({ each: true })
    playersMembers: string[];
}