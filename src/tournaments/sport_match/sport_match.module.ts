import { Module } from '@nestjs/common';
import { SportMatchService } from './sport_match.service';
import { SportMatchController } from './sport_match.controller';
import { SportMatchRepository } from './sport_match.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { SportMatch, SportMatchSchema } from './sport_match.schema';
import { TeamsModule } from '../teams/teams.module';

@Module({
  imports: [
      MongooseModule.forFeature(
        [{ name: SportMatch.name, schema: SportMatchSchema }],
        process.env.TOURNAMENTS_DB
      ),
      TeamsModule,
    ],
  controllers: [SportMatchController],
  providers: [SportMatchService,SportMatchRepository],
  exports:[SportMatchService]
})
export class SportMatchModule {}
