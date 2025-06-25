import { IsString, IsOptional, IsArray, IsEnum } from 'class-validator';

export class UpdateTeamDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  _idImg?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['active', 'inactive', 'disbanded', 'suspended'])
  @IsOptional()
  status?: string;
}
