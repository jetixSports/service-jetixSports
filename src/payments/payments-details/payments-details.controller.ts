import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ForbiddenException, ValidationPipe, Put } from '@nestjs/common';
import { PaymentsDetailsService } from './payments-details.service';
import { CreatePaymentsDetailDto } from './dto/create-payments-detail.dto';
import { Request } from 'express';
import { Auth } from 'src/decorators/auth/auth.decorator';
import { UpdatePaymentsDetailDto } from './dto/update-payments-detail.dto';
import { FindPaymentsDetailDto } from './dto/find-payments-detail.dto';

@Controller('payments-details')
export class PaymentsDetailsController {
  constructor(private readonly paymentsDetailsService: PaymentsDetailsService) { }
  @Auth("Auth")
  @Post()
  create(@Req() request: Request, @Body(ValidationPipe) createPaymentsDetailDto: CreatePaymentsDetailDto) {
    if (request.userData?._id != createPaymentsDetailDto._idUser)
      throw new ForbiddenException('Estas intentando crear los detalles de pago de otra persona.')
    return this.paymentsDetailsService.create(createPaymentsDetailDto);
  }
  @Auth("Auth")
  @Put(':id')
  update(@Req() request: Request, @Body(ValidationPipe) updatePaymentsDetailDto: UpdatePaymentsDetailDto, @Param('id') id: string) {
    const _idUser = request.userData?._id ?? ''
    return this.paymentsDetailsService.update(id, _idUser, updatePaymentsDetailDto);
  }
  @Post('findIds')
  findIds(@Req() request: Request, @Body(ValidationPipe) findPaymentsDetailDto: {id:string[]}) {
    return this.paymentsDetailsService.findIds(findPaymentsDetailDto);
  }
  @Post('find')
  find(@Req() request: Request, @Body(ValidationPipe) findPaymentsDetailDto: FindPaymentsDetailDto) {
    return this.paymentsDetailsService.find(findPaymentsDetailDto);
  }

  @Auth("Auth")
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsDetailsService.remove(id);
  }
}
