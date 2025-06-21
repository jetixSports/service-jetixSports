import { Details } from './create-payments-detail.dto';
import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

enum TypePay {
    'bank_transfer' = 'bank_transfer', 'binance' = 'binance', 'mobile_payment' = 'mobile_payment'
}

export class UpdatePaymentsDetailDto {

    @IsOptional()
    @IsString()
    @IsEnum(TypePay)
    typePay?: string;

    @IsOptional()
    @IsObject()
    @Type(() => Details)
    details?: Details
}
