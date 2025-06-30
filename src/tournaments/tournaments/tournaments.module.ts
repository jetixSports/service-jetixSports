import { Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';
import { TournamentsRepository } from './tournaments.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Tournaments, TournamentsSchema } from './tournaments.schema';
import { ImagesModule } from 'src/utils/images/images.module';
import { TeamsModule } from '../teams/teams.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Tournaments.name, schema: TournamentsSchema }],
      process.env.TOURNAMENTS_DB
    ),
    ImagesModule,
    TeamsModule

  ],
  controllers: [TournamentsController],
  providers: [TournamentsService, TournamentsRepository],
  exports: [TournamentsService]
})
export class TournamentsModule { }
