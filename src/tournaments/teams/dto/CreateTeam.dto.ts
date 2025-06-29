import { IsString, IsOptional, IsArray, IsNotEmpty } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  _idImg?: string;

  @IsString()
  _idLeader: string;
  
  @IsArray()
  @IsOptional()
  members?: string[];

  @IsString()
  @IsOptional()
  description?: string;
}