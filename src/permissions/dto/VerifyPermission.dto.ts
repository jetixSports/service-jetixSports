import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, IsBoolean, IsArray } from "class-validator";

export class VerifyPermissionDto {
  @ApiProperty({
    description: "Lista de códigos de permisos a verificar",
    example: ["CREATE_USER", "EDIT_USER", "DELETE_USER"],
    type: [String],
    required: true,
    maxItems: 20,
    items: {
      type: "string",
      maxLength: 50,
      pattern: "^[A-Z_]+$",
    },
  })
  @IsArray()
  code: string[];

  @ApiProperty({
    description: "Rol del usuario para verificar permisos",
    example: "ADMIN",
    maxLength: 50,
    required: true,
    pattern: "^[A-Z_]+$",
  })
  @IsString()
  @MaxLength(50)
  role: string;
}
