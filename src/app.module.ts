import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { PermissionsModule } from "./permissions/permissions.module";
import { JwtGlobalModule, } from "./jwt/jwt.module";
import { RolesModule } from "./roles/roles.module";

@Module({
  imports: [
    RolesModule,
    JwtGlobalModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    PermissionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
