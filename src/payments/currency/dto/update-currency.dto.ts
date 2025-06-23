import { PartialType } from '@nestjs/mapped-types';
import { CreateCurrencyDto } from './create-currency.dto';
import { IsOptional, IsEnum } from 'class-validator';

export class UpdateCurrencyDto extends PartialType(CreateCurrencyDto) {
    @IsOptional()
    @IsEnum(['active', 'inactive'], { message: 'El estado debe ser active o inactive' })
    status?: string;
}