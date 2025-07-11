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
class ScoreTeam{
    @ApiProperty({
        description: 'ID del equipo participante en el partido',
        example: '5f8d3b5b3b3b3b3b3b3b3b3b',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    _idTeam: string;

    @ApiProperty({
        description: 'Puntuación final del equipo en el partido',
        example: 3,
        required: true
    })
    @IsNumber()
    @IsNotEmpty()
    score: number;
}
export class FinishedMatchDto {
     @ApiProperty({
        description: 'ID del partido que finalizó',
        example: '5f8d3b5b3b3b3b3b3b3b3b3c',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    _idMatch: string;

    @ApiProperty({
        description: 'ID del usuario que registra el resultado',
        example: '5f8d3b5b3b3b3b3b3b3b3b3d',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    _idUser: string;

    @ApiProperty({
        description: 'ID del torneo al que pertenece el partido',
        example: '5f8d3b5b3b3b3b3b3b3b3b3e',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    _idTournament: string;

    @ApiProperty({
        description: 'ID del equipo ganador del partido',
        example: '5f8d3b5b3b3b3b3b3b3b3b3f',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    _idTeamWinner: string;

    @ApiProperty({
        description: 'Duración del partido en minutos',
        example: 90,
        required: true,
        minimum: 1
    })
    @IsNumber()
    @IsNotEmpty()
    duration: number;

    @ApiProperty({
        description: 'Arreglo de objetos con puntuaciones por equipo',
        type: [ScoreTeam],
        required: true,
        example: [
            { _idTeam: '5f8d3b5b3b3b3b3b3b3b3b3b', score: 2 },
            { _idTeam: '5f8d3b5b3b3b3b3b3b3b3b3f', score: 3 }
        ]
    })
    @IsArray()
    @IsObject({ each: true })
    scoreTeams: ScoreTeam[];
}