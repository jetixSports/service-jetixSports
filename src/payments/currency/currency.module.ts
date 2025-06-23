import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { CurrencyRepository } from './currency.repository';
import { Currency, CurrencySchema } from './currency.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Currency.name, schema: CurrencySchema }], 
      process.env.PAYMENTS_DB)
  ],
  controllers: [CurrencyController],
  providers: [CurrencyService, CurrencyRepository],
  exports: [CurrencyService, CurrencyRepository]
})
export class CurrencyModule {}