// src/payments-history/dto/create-payment-history.dto.ts
import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsObject,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class FilterByTeamsDto {


    @ApiProperty({ description: 'Tournament ID associated with the payment' })
    @IsString()
    @IsOptional()

    _idTeam?: string;

    @ApiProperty({ description: 'Tournament ID associated with the payment' })
    @IsString()
    @IsOptional()

    _idReferee?: string;

    @ApiProperty({ type: String })
    @IsString({ each: true })
    @IsOptional()

    playersMembers?: string;
}

export class FilterTournamentDto {
    @ApiProperty({ description: 'Tournament ID associated with the payment' })
    @IsString()
    @IsOptional()
    _id?: string;

    @ApiProperty({ description: 'Tournament ID associated with the payment' })
    @IsString()
    @IsOptional()
    name?: string;
    @ApiProperty({ description: 'Tournament ID associated with the payment' })
    @IsString()
    @IsOptional()
    status?: string;

    @ApiProperty({ description: 'Tournament ID associated with the payment' })
    @IsObject()
    @IsOptional()
    teams?: FilterByTeamsDto;

}

