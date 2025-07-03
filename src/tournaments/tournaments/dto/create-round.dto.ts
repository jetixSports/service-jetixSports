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

export class CreateRoundDto {
    @ApiProperty({ description: 'Tournament ID associated with the payment' })
    @IsNumber()
    @Min(1)
    nRound: number;

    @ApiProperty({ type: [String] })
    @IsArray()
    @IsString({ each: true })
    teamsMatchs: string[];

    @ApiProperty({ type: [String] })
    @IsArray()
    @IsString({ each: true })
    _idMatchs: string[];

    @ApiProperty({ type: [String] })
    @IsArray()
    @IsString({ each: true })
    teamsWinners: string[];
}