import { Module } from '@nestjs/common';
import { InvitationsController } from './invitation.controller';
import { InvitationsService } from './invitation.service';
import { InvitationsRepository } from './invitation.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Invitation, InvitationSchema } from './invitation.schema';
import { TeamsModule } from 'src/tournaments/teams/teams.module';

@Module({
  imports: [
    TeamsModule,
        MongooseModule.forFeature(
          [{ name: Invitation.name, schema: InvitationSchema }],
          process.env.TOURNAMENTS_DB
        ),
      ],
  controllers: [InvitationsController],
  providers: [InvitationsService,InvitationsRepository],
  exports:[InvitationsService]
})
export class InvitationModule {}
