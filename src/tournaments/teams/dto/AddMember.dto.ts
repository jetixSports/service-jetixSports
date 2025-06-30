import { IsString, IsNotEmpty } from 'class-validator';

export class AddMemberDto {
  @IsString()
  @IsNotEmpty()
  _idTeam: string;
  @IsString()
  @IsNotEmpty()
  _idUser: string;
}