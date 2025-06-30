import { Body, Controller, Post, Get, Param, Patch } from '@nestjs/common';
import { InvitationsService } from './invitation.service';
import { Invitation } from './invitation.schema';
import { CreateInvitationDto } from './dto/CreateInvitation.dto';
import { FindInvitationDto } from './dto/UpdateInvitation.dto';

@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Post()
  create(@Body() createInvitationDto: CreateInvitationDto) {
    return this.invitationsService.createInvitation(createInvitationDto);
  }

  @Post("filter")
  find(@Body() findInvitationDto: FindInvitationDto) {
    return this.invitationsService.getInvitations(findInvitationDto);
  }

  @Post('accept')
  accept(@Body() findInvitationDto: FindInvitationDto){
    return this.invitationsService.changeInvitation(findInvitationDto,'accepted');
  }

  @Post('deny')
  deny(@Body() findInvitationDto: FindInvitationDto) {
    return this.invitationsService.changeInvitation(findInvitationDto,'denied');
  }
}
