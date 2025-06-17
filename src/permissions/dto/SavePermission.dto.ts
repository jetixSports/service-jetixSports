import {
  IsString,
  MaxLength,
  IsBoolean,
} from "class-validator";

export class SavePermissionDto {
  @IsString()
  @MaxLength(50)
  code: string;

  
}
