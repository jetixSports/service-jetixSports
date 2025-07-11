import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AddMemberDto {
   @ApiProperty({
    description: 'ID del equipo al que se agregará el miembro',
    example: '507f1f77bcf86cd799439011',
    required: true,
    type: String
  })
  @IsString()
  @IsNotEmpty()
  _idTeam: string;

  @ApiProperty({
    description: 'ID del usuario que se agregará como miembro',
    example: '658f1f77bcf86cd799439022',
    required: true,
    type: String
  })
  @IsString()
  @IsNotEmpty()
  _idUser: string;
}