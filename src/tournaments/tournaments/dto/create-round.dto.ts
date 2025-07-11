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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class CreateRoundDto {
    @ApiPropertyOptional({
        description: 'Número de la ronda (debe ser mayor o igual a 1)',
        example: 1,
        minimum: 1,
        required: true,
        type: Number
    })
    @IsNumber()
    @Min(1)
    nRound?: number;

    @ApiProperty({
        description: 'IDs de los equipos que participan en los partidos de esta ronda',
        example: ['team1_id', 'team2_id', 'team3_id'],
        required: true,
        type: [String],
        minItems: 2
    })
    @IsArray()
    @IsString({ each: true })
    teamsMatchs: string[];

    @ApiProperty({
        description: 'IDs de los partidos programados para esta ronda',
        example: ['match1_id', 'match2_id'],
        required: true,
        type: [String]
    })
    @IsArray()
    @IsString({ each: true })
    _idMatchs: string[];

    @ApiProperty({
        description: 'IDs de los equipos ganadores que avanzan a la siguiente ronda',
        example: ['team1_id', 'team3_id'],
        required: true,
        type: [String]
    })
    @IsArray()
    @IsString({ each: true })
    teamsWinners: string[];
}