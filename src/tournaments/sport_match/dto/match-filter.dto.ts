// src/matches/dto/match-filter.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsArray } from 'class-validator';

export class MatchFilterDto {
     @ApiProperty({
        description: "ID opcional del partido",
        example: "507f1f77bcf86cd799439011",
        required: false
    })
    @IsOptional()
    @IsString()
    _id?: string;

    @ApiProperty({
        description: "ID opcional del torneo asociado",
        example: "658f1f77bcf86cd799439022",
        required: false
    })
    @IsOptional()
    @IsString()
    _idTournament?: string;

    @ApiProperty({
        description: "Filtrar por ID de equipo participante",
        example: "55af1f77bcf86cd799439033",
        required: false
    })
    @IsOptional()
    @IsString()
    "teams._idTeam"?: string;

    @ApiProperty({
        description: "Filtrar por ID de stream asociado al equipo",
        example: "stream_12345",
        required: false
    })
    @IsOptional()
    @IsString()
    "teams._idStream"?: string;

    @ApiProperty({
        description: "Filtrar por ID de jugadores miembros del equipo",
        example: "player1_id,player2_id",
        required: false
    })
    @IsOptional()
    @IsString()
    "teams.playersMembers"?: string;

    @ApiProperty({
        description: "Filtrar por puntuación del equipo",
        example: "3",
        required: false
    })
    @IsOptional()
    @IsString()
    "teams.score"?: string;

    @ApiProperty({
        description: "Filtrar por estado del partido (ej: 'pendiente', 'en_juego', 'finalizado')",
        example: "finalizado",
        required: false
    })
    @IsOptional()
    @IsString()
    status?: string;

    @ApiProperty({
        description: "Filtrar por tipo de deporte",
        example: "fútbol",
        required: false
    })
    @IsOptional()
    @IsString()
    typeSport?: string;

    @ApiProperty({
        description: "Filtrar por ID del equipo ganador",
        example: "55af1f77bcf86cd799439033",
        required: false
    })
    @IsOptional()
    @IsString()
    _idTeamWinner?: string;

    @ApiProperty({
        description: "Filtrar por duración del partido en minutos",
        example: 90,
        required: false,
        type: Number
    })
    @IsOptional()
    @IsNumber()
    duration?: number;

}