import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  MinLength,
  MaxLength,
  Matches,
  IsIn,
} from "class-validator";

export class UpdateUserDto {
  @IsString()
  _id: string;
  @IsString()
  @MaxLength(50)
  firstName: string;

  @IsString()
  @MaxLength(50)
  username: string;

  @IsString()
  @MaxLength(50)
  lastName: string;

  @IsString()
  role: string;
}
