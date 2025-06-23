import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { PermissionsModule } from "./permissions/permissions.module";
import { JwtGlobalModule, } from "./jwt/jwt.module";
import { RolesModule } from "./roles/roles.module";
import { ConfigModule } from "@nestjs/config";
import { PaymentsDetailsModule } from './payments/payments-details/payments-details.module';
import configurations from "config/configurations";
import { CurrencyModule } from "./payments/currency/currency.module";

@Module({
  imports: [
    RolesModule,
    JwtGlobalModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    PermissionsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
      load: [configurations],
    }),
    PaymentsDetailsModule,
    CurrencyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
