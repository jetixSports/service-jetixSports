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

export class AddTeamDto {


    @ApiProperty({
        description: 'Id del equipo a agregar',
        example: '5f8d3b5b3b3b3b3b3b3b3b3b',
        required: true,
        type: String
    })
    @IsString()
    @IsNotEmpty()
    _idTeam: string;

    @ApiProperty({
        description: 'Identificador único del líder del equipo',
        example: '5f8d3b5b3b3b3b3b3b3b3b3c',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    _idLeader: string;

    @ApiProperty({
        description: 'Lista de IDs de los jugadores miembros del equipo',
        example: ['5f8d3b5b3b3b3b3b3b3b3b3d', '5f8d3b5b3b3b3b3b3b3b3b3e'],
        required: true,
        type: [String],
        minItems: 1
    })
    @IsArray()
    @IsString({ each: true })
    playersMembers: string[];
}