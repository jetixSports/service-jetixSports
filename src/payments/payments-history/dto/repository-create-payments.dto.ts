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
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePaymentHistoryDto } from './create-payments-history.dto';

export class RepositoryCreateDto extends PartialType(CreatePaymentHistoryDto) {
  @ApiProperty({ description: 'User ID associated with the payment' })
  @IsString()
  @IsNotEmpty()
  _idImg: string;

 @ApiProperty({ description: 'User ID associated with the payment' })
  @IsString()
  @IsNotEmpty()
  _idUserVerify: string;

}