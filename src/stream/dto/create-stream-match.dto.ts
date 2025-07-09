import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateStreamMatchDto {
  @IsString()
  @IsNotEmpty()
  _idUser: string;
  @IsString()
  @IsNotEmpty()
  _idTournament: string;

  @IsString()
  _idMatch: string;

  @IsString()
  _idTeam: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  URL: string;

}