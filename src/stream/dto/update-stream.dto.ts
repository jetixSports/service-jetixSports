import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class UpdateStreamDto {
  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsString()
  @IsNotEmpty()
  _idUser: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @IsOptional()
  URL?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  status?: string;
}