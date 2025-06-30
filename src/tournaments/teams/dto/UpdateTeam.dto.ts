import { IsString, IsOptional, IsArray, IsEnum, IsUrl } from 'class-validator';

export class UpdateTeamDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  _idImg?: string;

  @IsString()
  @IsOptional()
  @IsUrl({}, { message: 'La URL de la imagen debe ser válida' })
  img?: string;


  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['active', 'inactive', 'disbanded', 'suspended'])
  @IsOptional()
  status?: string;
}