import { IsString, IsNotEmpty, IsUrl, IsOptional } from 'class-validator';

export class UpdateTeamImageDto {
  @IsString()
  @IsOptional()
  _idImg?: string;

  @IsString()
  @IsOptional()
  @IsUrl({}, { message: 'La URL de la imagen debe ser válida' })
  img?: string;
}