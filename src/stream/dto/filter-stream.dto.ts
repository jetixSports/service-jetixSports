import {
  IsString,
  IsOptional,
  IsIn,
  Max,
  Min,
  IsNumber,
} from "class-validator";
import { Transform } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class FilterStreamDto {
  @ApiPropertyOptional({
    description: "Filtrar por ID del stream",
    example: "507f1f77bcf86cd799439011",
    type: String,
  })
  @IsString()
  @IsOptional()
  _id?: string;

  @ApiPropertyOptional({
    description: "Filtrar por ID del torneo",
    example: "507f1f77bcf86cd799439012",
    type: String,
  })
  @IsString()
  @IsOptional()
  _idTournament?: string;
  @ApiPropertyOptional({
    description: "Filtrar por ID del usuario (creador del stream)",
    example: "507f1f77bcf86cd799439013",
    type: String,
  })
  @IsString()
  @IsOptional()
  _idUser?: string;

  @ApiPropertyOptional({
    description: "Filtrar por ID del partido",
    example: "507f1f77bcf86cd799439014",
    type: String,
  })
  @IsString()
  @IsOptional()
  _idSmatch?: string;

  @ApiPropertyOptional({
    description: "Filtrar por ID del equipo",
    example: "507f1f77bcf86cd799439015",
    type: String,
  })
  @IsString()
  @IsOptional()
  _idTeam?: string;

  @ApiPropertyOptional({
    description: "Filtrar por URL del stream (coincidencia parcial)",
    example: "twitch.tv",
    type: String,
  })
  @IsString()
  @IsOptional()
  URL?: string;

  @ApiPropertyOptional({
    description: "Filtrar por estado del stream",
    enum: ["active", "inactive", "pending", "completed", "cancelled"],
    example: "active",
    type: String,
  })
  @IsString()
  @IsOptional()
  @IsIn(["active", "inactive", "pending", "completed", "cancelled"], {
    message:
      "El estado debe ser uno de: active, inactive, pending, completed, cancelled",
  })
  status?: string;

  @ApiPropertyOptional({
    description: "Número de página para paginación (por defecto: 1)",
    example: 1,
    type: Number,
    minimum: 1,
  })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: "Cantidad de items por página (por defecto: 10, máximo: 100)",
    example: 10,
    type: Number,
    minimum: 1,
    maximum: 100,
  })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}
