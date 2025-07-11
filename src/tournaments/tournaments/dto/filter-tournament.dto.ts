// src/payments-history/dto/create-payment-history.dto.ts
import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsObject,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class FilterByTeamsDto {
@ApiProperty({
        description: 'ID del equipo para filtrar torneos',
        example: '5f8d3b5b3b3b3b3b3b3b3b3b',
        required: false
    })
    @IsString()
    @IsOptional()
    _idTeam?: string;

    @ApiProperty({
        description: 'ID del árbitro asociado a equipos para filtrar',
        example: '5f8d3b5b3b3b3b3b3b3b3b3c',
        required: false
    })
    @IsString()
    @IsOptional()
    _idReferee?: string;

    @ApiProperty({
        description: 'ID de jugadores miembros para filtrar por equipos',
        example: '5f8d3b5b3b3b3b3b3b3b3b3d',
        required: false
    })
    @IsString()
    @IsOptional()
    playersMembers?: string;
}

export class FilterTournamentDto {
     @ApiProperty({
        description: 'ID del torneo para búsqueda específica',
        example: '5f8d3b5b3b3b3b3b3b3b3b3e',
        required: false
    })
    @IsString()
    @IsOptional()
    _id?: string;

    @ApiProperty({
        description: 'Nombre del torneo para búsqueda parcial',
        example: 'Torneo Regional',
        required: false
    })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({
        description: 'Estado del torneo para filtrar',
        example: 'activo',
        enum: ['activo', 'cancelado', 'finalizado', 'pendiente'],
        required: false
    })
    @IsString()
    @IsOptional()
    status?: string;

    @ApiProperty({
        description: 'Filtros avanzados por equipos participantes',
        type: FilterByTeamsDto,
        required: false
    })
    @IsObject()
    @IsOptional()
    teams?: FilterByTeamsDto;

}

