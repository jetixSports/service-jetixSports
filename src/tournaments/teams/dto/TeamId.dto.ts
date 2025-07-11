import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class TeamIdDto {
   @ApiProperty({
      description: 'ID del equipo',
      example: '507f1f77bcf86cd799439011',
      required: true,
      type: String
    })
  @IsString()
  @IsNotEmpty()
  _id: string;
}