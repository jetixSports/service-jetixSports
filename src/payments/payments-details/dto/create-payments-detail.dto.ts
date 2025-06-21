import { Transform, Type } from "class-transformer";
import { IsEmail, IsEnum, IsIn, IsObject, isString, IsString, MaxLength, MinLength } from "class-validator";

class mobile_payment {
    @IsString()
    @Transform(({ value }) => value.replaceAll('.', '').replaceAll(',', ''))
    identity: string

    @IsString()
    @MaxLength(4)
    @MinLength(4)
    mobileCode: string

    @IsString()
    @MaxLength(11)
    @MinLength(11)
    @Transform(({ value }) => value.replaceAll('-', '').replaceAll('+58', '0').trim())
    phoneNumber: string
}

class bank_transfer {
    @IsString()
    @MaxLength(20)
    @MinLength(20)
    @Transform(({ value }) => value.trim())
    bankNumber: string
}
class binance {
    @IsString()
    @IsEmail()
    email: string
}

export  class Details{
    @IsString()
    @IsEmail()
    email?: string
    @IsString()
    @MaxLength(20)
    @MinLength(20)
    @Transform(({ value }) => value?.replaceAll(' ',''))
    bankNumber?: string
    @IsString()
    @Transform(({ value }) => value.replaceAll('.', '').replaceAll(',', ''))
    identity?: string

    @IsString()
    @MaxLength(4)
    @MinLength(4)
    mobileCode?: string

    @IsString()
    @MaxLength(11)
    @MinLength(11)
    @Transform(({ value }) => value.replaceAll('-', '').replaceAll('+58', '0')?.replaceAll(' ',''))
    phoneNumber?: string

}
enum TypePay {
  'bank_transfer'='bank_transfer', 'binance'='binance', 'mobile_payment'='mobile_payment'
}
export class CreatePaymentsDetailDto {
    @IsString()
    _idUser: string;

    @IsString()
    @IsEnum(TypePay)
    
    typePay: string;

    @IsObject()
    @Type(() => Details)
    details: Details
}