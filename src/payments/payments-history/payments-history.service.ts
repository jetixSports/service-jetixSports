import { ForbiddenException, Injectable } from '@nestjs/common';
import { PaymentsHistoryRepository } from './payments-history.repository';
import { ImagesService } from 'src/utils/images/images.service';
import { CreatePaymentHistoryDto } from './dto/create-payments-history.dto';
import { TeamsService } from 'src/tournaments/teams/teams.service';
import { TournamentsService } from 'src/tournaments/tournaments/tournaments.service';

@Injectable()
export class PaymentsHistoryService {
  constructor(private readonly paymentsHistoryRepository: PaymentsHistoryRepository,
    private readonly imagesService: ImagesService,
    private readonly tournamentsService: TournamentsService,

  ) {}
  async create(file: Express.Multer.File,createPaymentHistoryDto:CreatePaymentHistoryDto){
    const dataTournament=await this.tournamentsService.findById(createPaymentHistoryDto._idTournament)
    const team=dataTournament.data.teams.find((team)=>team._idLeader==createPaymentHistoryDto._idUser)
    if(!team)
      throw new ForbiddenException("No eres el lider de ningun equipo")
    if(team._idPayments)
      throw new ForbiddenException("Este equipo ya posee un pago")
    const existingCode=await this.paymentsHistoryRepository.existCode(createPaymentHistoryDto.transactionCode)
    if(existingCode)
        throw new ForbiddenException("Este pago ya se encuentra registrado")
    const saveImage=await this.imagesService.create(createPaymentHistoryDto._idUser,{type:"pay"},file)
    const savePayments=await this.paymentsHistoryRepository.create({...createPaymentHistoryDto,
        _idImg:saveImage.data._id+'',
        _idUserVerify:"sa"
    })
    await this.tournamentsService.addPayTeam({_idPayment:savePayments.data._id+'',_idTeam:team._idTeam,_idTournament:dataTournament.data._id+''})    
    return savePayments
  }
}
