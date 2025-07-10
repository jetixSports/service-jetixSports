import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsUrl } from "class-validator";

export class CreateStreamMatchDto {
  @ApiProperty({
    description: "ID del usuario que crea el stream",
    example: "507f1f77bcf86cd799439011",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  _idUser: string;

  @ApiProperty({
    description: "ID del torneo asociado al stream",
    example: "507f1f77bcf86cd799439012",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  _idTournament: string;

  @ApiProperty({
    description: "ID del partido que se transmitirá",
    example: "507f1f77bcf86cd799439013",
    required: false,
  })
  @IsString()
  _idMatch: string;

  @ApiProperty({
    description: "ID del equipo relacionado (opcional)",
    example: "507f1f77bcf86cd799439014",
    required: false,
  })
  @IsString()
  _idTeam: string;

  @ApiProperty({
    description: "URL del stream (debe ser una URL válida)",
    example: "https://twitch.tv/mi-canal",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  URL: string;
}
