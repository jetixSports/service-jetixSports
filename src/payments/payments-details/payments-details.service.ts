import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentsDetailDto } from './dto/create-payments-detail.dto';
import { UpdatePaymentsDetailDto } from './dto/update-payments-detail.dto';
import { PaymentsDetailsRepository } from './payments-details.repository';
import { UsersService } from 'src/users/users.service';
import { FindPaymentsDetailDto } from './dto/find-payments-detail.dto';

@Injectable()
export class PaymentsDetailsService {
  constructor(
    private readonly paymentsDetailsRepository: PaymentsDetailsRepository,
    private readonly usersService: UsersService
  ) { }
  async create({ _idUser, details, typePay }: CreatePaymentsDetailDto) {
    const existUser = await this.usersService.existingId({ _id: _idUser })
    if (!existUser)
      throw new BadRequestException('Este usuario no existe')
    if (['bank_tranfer', 'mobile_payment'].includes(typePay)) {
      const codeBank = typePay == 'bank_transfer' ? details?.mobileCode?.slice(0, 4) : details.mobileCode
      const existCode = true //comprobando existencia del codigo, agregar despues
      if (!existCode)
        throw new BadRequestException('Este banco no existe')
    }
    const existDetail = await this.paymentsDetailsRepository.existingPaymentDetail({_idUser, details, typePay })
    if (existDetail)
      throw new ForbiddenException('Estos detalles de pago ya existen')
    const saveBank = await this.paymentsDetailsRepository.savePaymentDetail({ _idUser, details, typePay })
    return { ...saveBank, data: {} }
  }

  async find(data: FindPaymentsDetailDto) {
    const paymentsDetails = await this.paymentsDetailsRepository.find(data)
    if (!paymentsDetails || paymentsDetails.length == 0)
      throw new NotFoundException("Detalles de pago no encontrado")
    return { statusCode: 200, data: paymentsDetails, message: "Detalles de pago obtenido con exito", }
  }

  async update(_id: string, _idUser: string, updateData: UpdatePaymentsDetailDto) {
    const paymentsDetails = await this.paymentsDetailsRepository.find({ _id })
    if (!paymentsDetails || paymentsDetails.length == 0)
      throw new NotFoundException("Detalles de pago no encontrado")
    if (paymentsDetails[0]?._idUser != _idUser)
      throw new ForbiddenException("Estas tratando de editar los detalles de pago de otra persona")
    const onlyTypePay = updateData?.typePay ?? paymentsDetails[0]?.typePay
    if (onlyTypePay && ['bank_tranfer', 'mobile_payment'].includes(onlyTypePay ?? '')) {
      const codeBank = onlyTypePay == 'bank_transfer' ? updateData?.details?.bankNumber?.slice(0, 4) : updateData?.details?.mobileCode
      if (codeBank) {
        const existCode = true //comprobando existencia del codigo, agregar despues
        if (!existCode)
          throw new BadRequestException('Este banco no existe')
      }
    }
    const updateState = await this.paymentsDetailsRepository.update(_id,updateData)
    if (updateState.matchedCount < 1)
      throw new NotFoundException("Detalles de pago a actualizar no encontrado");
    if (updateState.modifiedCount < 1)
      throw new NotFoundException("Detalles de pago encontrado, pero no actualizado");
    return { statusCode: 200, message: "Detalles de pago actualizado con exito" };
  }

  async remove(id: string) {
    const deleteState = await this.paymentsDetailsRepository.delete(id)
    if (deleteState.matchedCount < 1)
      throw new NotFoundException("Detalles de pago no encontrado");
    if (deleteState.modifiedCount < 1)
      throw new NotFoundException("Detalles de pago ya eliminado anteriormente");
    return { statusCode: 200, message: "Detalles de pago eliminado con exito" };
  }
  async findIds({id}:{id:string[]}){
    const details=await this.paymentsDetailsRepository.findIds(id)
    if(details.length==0)
      throw new NotFoundException("No se encontro ningun detalle de pago")
    return {
      statusCode:200,
      message:"Detalles de pago obtenidos correctamente",
      data:details
    }
  }
}
