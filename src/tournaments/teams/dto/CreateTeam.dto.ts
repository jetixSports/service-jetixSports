import { IsString, IsOptional, IsArray, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  _idLeader: string;
  
  @IsArray()
  @IsOptional()
  members?: string[];

  @IsString()
  @IsOptional()
  description?: string;
}
