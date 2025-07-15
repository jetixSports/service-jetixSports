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
@ApiProperty({
        description: 'Nombre oficial del torneo',
        example: 'Torneo Internacional de Fútbol 2024',
        required: true,
        maxLength: 100
    })
    @IsString()
    @IsNotEmpty()
    name: string;

   @ApiProperty({
        description: 'Descripción detallada del torneo',
        example: 'Competición anual para equipos juveniles de categoría A',
        required: true,
        maxLength: 500
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        description: 'ID de la imagen asociada al torneo (opcional)',
        example: '65d8f1f77bcf86cd799439011',
        required: false
    })
     @IsString()
    @IsNotEmpty()
    @IsOptional()
    _idImg?: string;

    @ApiProperty({
        description: 'Tipo de deporte del torneo',
        example: 'fútbol',
        required: true,
        enum: ['fútbol', 'baloncesto', 'voleibol', 'tenis']
    })
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    typeSport: string;

    
    @ApiProperty({
        description: 'IDs de pagos asociados (opcional)',
        example: ['pay_12345', 'pay_67890'],
        required: false,
        type: [String]
    })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    _idPayDetails?: string[];

    @ApiProperty({
        description: 'ID del árbitro principal asignado',
        example: 'ref_54321',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    _idReferee: string;

    @ApiProperty({
        description: 'Cupos disponibles para equipos (mínimo 2)',
        example: 16,
        minimum: 2,
        required: true
    })
    @IsNumber()
    @Min(2)
    @Transform(({value})=>Number(value))
    quotas: number;

     @ApiProperty({
        description: 'Monto de inscripción por equipo (mayor a 0)',
        example: 150.00,
        minimum: 1,
        required: true
    })
    @IsNumber()
    @Min(1)
    @Transform(({value})=>Number(value))
    amount: number;


    @ApiProperty({
        description: 'Espacio por equipo (número de jugadores, mínimo 1)',
        example: 5,
        minimum: 1,
        required: true
    })
    @Min(1)
    @IsNumber()
    @Transform(({value})=>Number(value))
    teamSpace: number;

    @ApiProperty({
        description: 'Fecha de inicio del torneo (formato YYYY-MM-DD)',
        example: '2024-08-01',
        required: true
    })
    @IsDate()
    @Type(() => Date)
    startDate: Date;

    @ApiProperty({
        description: 'Fecha de finalización del torneo (formato YYYY-MM-DD)',
        example: '2024-08-15',
        required: true
    })
    @IsDate()
    @Type(() => Date)
    endDate: Date;
}