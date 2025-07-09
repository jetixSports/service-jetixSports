import { IsString, IsOptional, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';

export class FilterStreamDto {
  @IsString()
      @IsOptional()
    _id?: string;

  @IsString()
  @IsOptional()
  _idTournament?: string;

  @IsString()
   @IsOptional()
  _idUser?: string;

  @IsString()
  @IsOptional()
  _idSmatch?: string;

  @IsString()
  @IsOptional()
  _idTeam?: string;

  @IsString()
  @IsOptional()
  URL?: string;

  @IsString()
  @IsOptional()
  @IsIn(['active', 'inactive', 'pending', 'completed', 'cancelled'], {
    message: 'Status must be one of: active, inactive, pending, completed, cancelled'
  })
  status?: string;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  page?: number = 1;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  limit?: number = 10;
}