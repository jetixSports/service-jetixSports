import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsUrl } from "class-validator";

export class UpdateStreamDto {
  @ApiProperty({
    description: "ID del stream a actualizar",
    example: "507f1f77bcf86cd799439011",
    required: true,
  })
  @IsString({ message: "El ID debe ser una cadena de texto" })
  @IsNotEmpty({ message: "El ID es requerido" })
  _id: string;

  @ApiProperty({
    description: "ID del usuario que realiza la actualización",
    example: "507f1f77bcf86cd799439012",
    required: true,
  })
  @IsString({ message: "El ID de usuario debe ser una cadena de texto" })
  @IsNotEmpty({ message: "El ID de usuario es requerido" })
  _idUser: string;

  @ApiPropertyOptional({
    description: "Nueva URL del stream (debe ser una URL válida)",
    example: "https://twitch.tv/nuevo-canal",
    type: String,
  })
  @IsString({ message: "La URL debe ser una cadena de texto" })
  @IsNotEmpty({ message: "La URL no puede estar vacía si se proporciona" })
  @IsUrl({}, { message: "La URL proporcionada no es válida" })
  @IsOptional()
  URL?: string;

  @ApiPropertyOptional({
    description: "Nuevo estado del stream",
    example: "active",
    enum: ["active", "inactive", "pending", "ended"],
    type: String,
  })
  @IsString({ message: "El estado debe ser una cadena de texto" })
  @IsNotEmpty({ message: "El estado no puede estar vacío si se proporciona" })
  @IsOptional()
  status?: string;
}
