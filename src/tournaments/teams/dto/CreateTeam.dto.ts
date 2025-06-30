import { IsString, IsOptional, IsArray, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  _idImg?: string;

  @IsString()
  @IsOptional()
  @IsUrl({}, { message: 'La URL de la imagen debe ser válida' })
  img?: string;

  @IsString()
  _idLeader: string;
  
  @IsArray()
  @IsOptional()
  members?: string[];

  @IsString()
  @IsOptional()
  description?: string;
}
