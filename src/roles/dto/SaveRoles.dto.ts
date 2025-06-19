import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  MaxLength,
  IsBoolean,
} from "class-validator";

export class SaveRolesDto {
  @ApiProperty({description: 'Codigo del rol',example:"User"})
  @IsString()
  @MaxLength(50)
  code: string;

  @ApiProperty({description: 'Nombre del rol',example:"Usuario",})
  @IsString()
  @MaxLength(50)
  name: string;
}
