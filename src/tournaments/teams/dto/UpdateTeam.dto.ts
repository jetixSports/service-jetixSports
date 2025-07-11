import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsEnum, IsUrl } from 'class-validator';

export class UpdateTeamDto {
  @ApiProperty({
    description: 'Nombre actualizado del equipo (opcional)',
    example: 'Los Legendarios',
    required: false,
    type: String,
    maxLength: 100
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'ID de la imagen asociada al equipo (opcional)',
    example: '65d8f1f77bcf86cd799439011',
    required: false,
    type: String
  })
  @IsString()
  @IsOptional()
  _idImg?: string;


  @ApiProperty({
    description: 'Descripción actualizada del equipo (opcional)',
    example: 'Equipo reformado para la temporada 2024',
    required: false,
    type: String,
    maxLength: 500
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Estado actual del equipo',
    enum: ['active', 'inactive', 'disbanded', 'suspended'],
    example: 'active',
    required: false
  })
  @IsEnum(['active', 'inactive', 'disbanded', 'suspended'])
  @IsOptional()
  status?: string;
}