import { Module } from '@nestjs/common';
import { PaymentsDetailsService } from './payments-details.service';
import { PaymentsDetailsController } from './payments-details.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentsDetailsRepository } from './payments-details.repository';
import { PaymentsDetails, PaymentsDetailsSchema } from './payments-details.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
      MongooseModule.forFeature(
        [{ name: PaymentsDetails.name, schema: PaymentsDetailsSchema }],
        process.env.PAYMENTS_DB
      ),
      UsersModule
    ],
    controllers: [PaymentsDetailsController],
    providers: [PaymentsDetailsService, PaymentsDetailsRepository],
    exports: [PaymentsDetailsService],
})
export class PaymentsDetailsModule {}
