import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvitationDto } from './dto/CreateInvitation.dto';
import { InvitationsRepository } from './invitation.repository';
import { TeamsService } from 'src/tournaments/teams/teams.service';
import { FindInvitationDto } from './dto/UpdateInvitation.dto';

@Injectable()
export class InvitationsService {
  constructor(private readonly invitationsRepository: InvitationsRepository,
    private readonly teamsService: TeamsService,
  ) {}

  async createInvitation(createInvitationDto: CreateInvitationDto) {
    const team=await this.teamsService.findTeamById({_id:createInvitationDto.teamId})
    if(createInvitationDto.invitorId!=team._idLeader)
      throw new ForbiddenException("No eres el lider de este equipo")
    const existInvitation= await this.invitationsRepository.existInvitation(createInvitationDto.teamId,createInvitationDto.userId,"pending")
    if(existInvitation)
      throw new ForbiddenException("Este usuario aun posee una invitacion pendiente")
    const saveInvitation=await this.invitationsRepository.saveInvitation(createInvitationDto)
    return {statusCode:200,message:'Invitacion enviada con exito'};
  }

  async getInvitations(findInvitationDto:FindInvitationDto) {
    const invitations=await this.invitationsRepository.find(findInvitationDto)
    if(invitations.length==0)
      throw new NotFoundException('Invitaciones no encotradas')
    return {data:invitations,code:200,message:"Invitaciones encontradas con exito"}
  }

  async changeInvitation(findInvitationDto: FindInvitationDto,status:string){
    const updateState=await this.invitationsRepository.changeInvitation(findInvitationDto,status)
    if(updateState.matchedCount==0)
      throw new NotFoundException("Invitacion no encontrada")
    if(updateState.modifiedCount==0)
      throw new NotFoundException("Invitacion no modificada")
    return {statusCode:200,message:'Invitacion actualizada con exito',data:{}};
  }
}
