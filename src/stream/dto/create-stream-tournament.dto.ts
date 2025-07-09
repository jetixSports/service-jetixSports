import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateStreamTournamentDto {
  @IsString()
  @IsNotEmpty()
  _idUser: string;

  @IsString()
  @IsNotEmpty()
  _idTournament: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  URL: string;

}