import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27018/Auth', {
      connectionName: 'Auth',
    }),
    MongooseModule.forRoot('mongodb://localhost:27018/Tournaments', {
      connectionName: 'Tournaments',
    }),
  ],
})
export class MongoModule {}