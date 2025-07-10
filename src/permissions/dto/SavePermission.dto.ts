import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, IsBoolean } from "class-validator";

export class SavePermissionDto {
  @ApiProperty({
    description: "Código único del permiso (máximo 50 caracteres)",
    example: "CREATE_USER",
    maxLength: 50,
    required: true,
    type: String,
    pattern: "^[A-Z_]+$",
  })
  @IsString()
  @MaxLength(50)
  code: string;
}
