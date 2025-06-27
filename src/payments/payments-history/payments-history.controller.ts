import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { PaymentsHistoryService } from "./payments-history.service";
import { CreatePaymentHistoryDto } from "./dto/create-payments-history.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { VerifyPaymentHistoryDto } from "./dto/verify-payments-history.dto";

@Controller("payments-history")
export class PaymentsHistoryController {
  constructor(
    private readonly paymentsHistoryService: PaymentsHistoryService
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPaymentDto: CreatePaymentHistoryDto
  ) {
    return this.paymentsHistoryService.create(file, createPaymentDto);
  }
  @Post("verify")
  verify(@Body() verifyPaymentHistoryDto: VerifyPaymentHistoryDto) {
    return this.paymentsHistoryService.verifyPay(verifyPaymentHistoryDto);
  }
  @Post("denied")
  denied(@Body() deniedPaymentHistory: VerifyPaymentHistoryDto) {
    return this.paymentsHistoryService.deniedPay(deniedPaymentHistory);
  }
}
