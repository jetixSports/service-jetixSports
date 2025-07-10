import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, IsBoolean, IsObject } from "class-validator";

export class UpdatePermissionDto {
  @ApiProperty({
    description: "Código único del permiso (máximo 50 caracteres)",
    example: "USER_MANAGEMENT",
    maxLength: 50,
    required: true,
  })
  @IsString()
  @MaxLength(50)
  code: string;

  @ApiProperty({
    description: "Objeto con los permisos a actualizar",
    type: "object",
    additionalProperties: {
      $ref: "#/components/schemas/UpdatePermission",
    },
    example: {
      ADMIN: {
        READ: true,
        UPDATE: true,
        CREATE: true,
        DELETE: false,
      },
      USER: {
        READ: true,
        UPDATE: false,
        CREATE: false,
        DELETE: false,
      },
    },
  })
  @IsObject()
  update: { [key: string]: UpdatePermission };
}
class UpdatePermission {
  @ApiProperty({
    description: "Permiso de lectura",
    example: true,
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  READ: boolean;

  @ApiProperty({
    description: "Permiso de actualización",
    example: false,
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  UPDATE: boolean;

  @ApiProperty({
    description: "Permiso de creación",
    example: true,
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  CREATE: boolean;

  @ApiProperty({
    description: "Permiso de eliminación",
    example: false,
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  DELETE: boolean;
}
