import { IsOptional, IsString, IsEnum } from 'class-validator';

export class FindCurrencyDto {
    @IsOptional()
    @IsString()
    _id?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    code?: string;

    @IsOptional()
    @IsString()
    shortname?: string;

    @IsOptional()
    @IsEnum(['active', 'inactive'], { message: 'El estado debe ser active o inactive' })
    status?: string;
}