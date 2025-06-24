import { Module } from '@nestjs/common';
import { InvitationsController } from './invitation.controller';
import { InvitationsService } from './invitation.service';

@Module({
  controllers: [InvitationsController],
  providers: [InvitationsService],
})
export class InvitationModule {}
