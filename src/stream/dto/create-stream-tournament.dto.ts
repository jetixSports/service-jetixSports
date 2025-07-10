import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsUrl } from "class-validator";

export class CreateStreamTournamentDto {
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
    description: "URL del stream (debe ser una URL válida)",
    example: "https://twitch.tv/mi-canal",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  URL: string;
}
