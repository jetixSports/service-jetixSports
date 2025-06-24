import { Body, Controller, Post, Get, Param, Patch } from '@nestjs/common';
import { InvitationsService } from './invitation.service';
import { Invitation } from './invitation.schema';

@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Post()
  create(@Body() invitation: Invitation): Invitation {
    return this.invitationsService.createInvitation(invitation);
  }

  @Get()
  findAll(): Invitation[] {
    return this.invitationsService.getInvitations();
  }

  @Patch('accept/:id')
  accept(@Param('id') id: string): Invitation | null {
    return this.invitationsService.acceptInvitation(id);
  }

  @Patch('deny/:id')
  deny(@Param('id') id: string): Invitation | null {
    return this.invitationsService.denyInvitation(id);
  }
}
