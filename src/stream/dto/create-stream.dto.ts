import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateStreamDto {
  @IsString()
  @IsNotEmpty()
  _idUser: string;

  @IsString()
  @IsNotEmpty()
  _idTournament: string;

  @IsString()
  @IsOptional()
  _idMatch?: string;

  @IsString()
  @IsOptional()
  _idTeam?: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  URL: string;

}