import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateTeamDto {
@ApiProperty({
    description: 'Nombre del equipo (obligatorio)',
    example: 'Los Invencibles',
    required: true,
    type: String,
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'ID del líder/creador del equipo (obligatorio)',
    example: '507f1f77bcf86cd799439011',
    required: true,
    type: String
  })
  @IsString()
  @IsNotEmpty()
  _idLeader: string;

  @ApiProperty({
    description: 'Array opcional de IDs de miembros del equipo',
    example: ['658f1f77bcf86cd799439022', '55af1f77bcf86cd799439033'],
    required: false,
    type: [String]
  })
  @IsArray()
  @IsOptional()
  members?: string[];

  @ApiProperty({
    description: 'Descripción opcional del equipo',
    example: 'Equipo campeón de la temporada 2023',
    required: false,
    type: String,
    maxLength: 500
  })
  @IsString()
  @IsOptional()
  description?: string;
}
