import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { CurrencyRepository } from './currency.repository';
import { Currency, CurrencySchema } from './currency.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Currency.name, schema: CurrencySchema }], 
      process.env.CURRENCY_COLLECTION)
  ],
  controllers: [CurrencyController],
  providers: [CurrencyService, CurrencyRepository],
  exports: [CurrencyService, CurrencyRepository]
})
export class CurrencyModule {}