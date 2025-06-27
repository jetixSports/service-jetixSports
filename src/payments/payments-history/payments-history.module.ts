import { Module } from '@nestjs/common';
import { PaymentsHistoryService } from './payments-history.service';
import { PaymentsHistoryController } from './payments-history.controller';
import { PaymentsHistoryRepository } from './payments-history.repository';
import { ImagesModule } from 'src/utils/images/images.module';
import { TeamsModule } from 'src/tournaments/teams/teams.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentsHistory, PaymentsHistorySchema } from './payments-history.schema';
import { TournamentsModule } from 'src/tournaments/tournaments/tournaments.module';

@Module({
  imports:[
      MongooseModule.forFeature(
              [{ name: PaymentsHistory.name, schema: PaymentsHistorySchema }],
              process.env.PAYMENTS_DB
            ),
    ImagesModule,
    TournamentsModule
  ],
  controllers: [PaymentsHistoryController],
  providers: [PaymentsHistoryService,PaymentsHistoryRepository],
  exports:[PaymentsHistoryService]
})
export class PaymentsHistoryModule {}
