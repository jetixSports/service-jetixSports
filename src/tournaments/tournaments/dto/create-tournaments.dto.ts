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

export class CreateTournamentDto {
    @ApiProperty({ description: 'Nombre del torneo' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Nombre del torneo' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: 'Tournament ID associated with the payment' })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    _idImg?: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    typeSport: string;

    @ApiProperty({ type: [String] })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    _idPayments?: string[];

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    _idReferee: string;

    @ApiProperty()
    @IsNumber()
    @Min(2)
    @Transform(({value})=>Number(value))
    quotas: number;

    @ApiProperty()
    @Min(1)
    @IsNumber()
    @Transform(({value})=>Number(value))
    teamSpace: number;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    startDate: Date;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    endDate: Date;
}