import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { PermissionsModule } from "./permissions/permissions.module";
import { InvitationModule } from "./invitations/invitation.module";
import { JwtGlobalModule, } from "./jwt/jwt.module";
import { RolesModule } from "./roles/roles.module";
import { ConfigModule } from "@nestjs/config";
import { PaymentsDetailsModule } from './payments/payments-details/payments-details.module';
import configurations from "config/configurations";
import { CurrencyModule } from "./payments/currency/currency.module";
import { ImagesModule } from './utils/images/images.module';
import { TeamsModule } from "./tournaments/teams/teams.module";
import { PaymentsHistoryModule } from './payments/payments-history/payments-history.module';
import { TournamentsModule } from './tournaments/tournaments/tournaments.module';

@Module({
  imports: [
    RolesModule,
    JwtGlobalModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    PermissionsModule,
    InvitationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
      load: [configurations],
    }),
    PaymentsDetailsModule,
    CurrencyModule,
    ImagesModule,
    TeamsModule,
    PaymentsHistoryModule,
    TournamentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
