import { Module } from '@nestjs/common';
import { StreamService } from './stream.service';
import { StreamController } from './stream.controller';
import { StreamRepository } from './stream.repository';
import { TournamentsModule } from 'src/tournaments/tournaments/tournaments.module';
import { SportMatchModule } from 'src/tournaments/sport_match/sport_match.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Stream, StreamSchema } from './stream.schema';
import { TeamsModule } from 'src/tournaments/teams/teams.module';

@Module({
  imports:[
    TournamentsModule,
    SportMatchModule,
    TeamsModule,
    MongooseModule.forFeature(
          [{ name: Stream.name, schema: StreamSchema }],
          process.env.TOURNAMENTS_DB
        ),
  ],
  controllers: [StreamController],
  providers: [StreamService,StreamRepository],
  exports:[StreamService]
})
export class StreamModule {}
