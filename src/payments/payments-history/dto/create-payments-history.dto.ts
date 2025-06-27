// src/payments-history/dto/create-payment-history.dto.ts
import { 
  IsString, 
  IsNumber, 
  IsBoolean, 
  IsDate, 
  IsOptional, 
  Matches, 
  Length,
  IsNotEmpty
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreatePaymentHistoryDto {
  @ApiProperty({ description: 'User ID associated with the payment' })
  @IsString()
  @IsNotEmpty()
  _idUser: string;

  @ApiProperty({ description: 'Tournament ID associated with the payment' })
  @IsString()
  @IsNotEmpty()
  _idTournament: string;

  @ApiProperty({ 
    description: 'Transaction code (exactly 6 digits)', 
    example: '123456' 
  })
  @IsString()
  @Length(6, 6, { message: 'Transaction code must be exactly 6 digits' })
  @Matches(/^\d+$/, { message: 'Transaction code must contain only digits' })
  transactionCode: string;

  @ApiProperty({ description: 'Payment receiver details ID' })
  @IsString()
  @IsNotEmpty()
  _idReceiveDetails: string;

  @ApiProperty({ description: 'Payment amount' })
  @IsNumber()
  @Transform(({value})=> Number(value))
  amount: number;

  @ApiProperty({ description: 'Exchange rate applied' })
  @IsNumber()
  @Transform(({value})=> Number(value))
  rateExchange: number;

  @ApiProperty({ description: 'Currency code (e.g., USD, EUR)' })
  @IsString()
  @IsNotEmpty()
  
  currency: string;

}