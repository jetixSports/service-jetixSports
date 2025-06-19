import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  MaxLength,
} from "class-validator";

export class FindByCodeDto {
  @ApiProperty({description: 'Codigo del rol',example:"User"})
  @IsString()
  @MaxLength(50)
  code: string;

}
