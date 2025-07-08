// src/matches/dto/match-filter.dto.ts
import { Exclude, Expose, Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsArray } from 'class-validator';

export class MatchFilterDto {
    @IsOptional()
    @IsString()
    _id?: string;

    @IsOptional()
    @IsString()
    _idTournament?: string;


    @IsOptional()
    @IsString()
    "teams._idTeam"?: string;

    @IsOptional()
    @IsString()
    "teams._idStream"?: string;

    @IsOptional()
    @IsString()
    "teams.playersMembers"?: string;

    @IsOptional()
    @IsString()
    "teams.score"?: string;


    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsString()
    typeSport?: string;

    @IsOptional()
    @IsString()
    _idTeamWinner?: string;

    @IsOptional()
    @IsNumber()
    duration?: number;

}