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
    @ApiProperty({ description: 'Tournament ID associated with the payment' })
    @IsString()
    @IsNotEmpty()
    _idTeam: string;

    @ApiProperty({ description: 'Tournament ID associated with the payment' })
    @IsNumber()
    @IsNotEmpty()
    score: Number;
}
export class FinishedMatchDto {
    @ApiProperty({ description: 'Tournament ID associated with the payment' })
    @IsString()
    @IsNotEmpty()
    _idMatch: string;

    @ApiProperty({ description: 'Tournament ID associated with the payment' })
    @IsString()
    @IsNotEmpty()
    _idUser: string;

    @ApiProperty({ description: 'Tournament ID associated with the payment' })
    @IsString()
    @IsNotEmpty()
    _idTournament: string;

    @ApiProperty({ description: 'Tournament ID associated with the payment' })
    @IsString()
    @IsNotEmpty()
    _idTeamWinner: string;

    @ApiProperty({ description: 'Tournament ID associated with the payment' })
    @IsNumber()
    @IsNotEmpty()
    duration: Number;

    @ApiProperty({ type: [String] })
    @IsArray()
    @IsObject({ each: true })
    scoreTeams: ScoreTeam[];
}