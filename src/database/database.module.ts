import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: process.env.AUTH_DB,
      useFactory: async (config: ConfigService) => ({
        uri: process.env.MONGODB_URI,
        dbName:process.env.AUTH_DB,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: process.env.PAYMENTS_DB,
      useFactory: async (config: ConfigService) => ({
        uri: process.env.MONGODB_URI,
        dbName:process.env.PAYMENTS_DB,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: process.env.UTILS_DB,
      useFactory: async (config: ConfigService) => ({
        uri: process.env.MONGODB_URI,
        dbName:process.env.UTILS_DB,
      }),
      inject: [ConfigService],
    }),
  ],
  
})
export class DatabaseModule {}
