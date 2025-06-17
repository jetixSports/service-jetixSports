import {
  IsString,
  MaxLength,
  IsBoolean,
  IsArray,
} from "class-validator";

export class VerifyPermissionDto {
  @IsArray()
  code: string[];

  @IsString()
  @MaxLength(50)
  role: string;
}
