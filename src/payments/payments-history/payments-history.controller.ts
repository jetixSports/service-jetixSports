import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PaymentsHistoryService } from './payments-history.service';
import { CreatePaymentHistoryDto } from './dto/create-payments-history.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('payments-history')
export class PaymentsHistoryController {
  constructor(private readonly paymentsHistoryService: PaymentsHistoryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create( @UploadedFile() file: Express.Multer.File,
    @Body() createPaymentDto: CreatePaymentHistoryDto,){
      return this.paymentsHistoryService.create(file,createPaymentDto)
  }
}
