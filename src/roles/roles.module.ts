
import { Module } from "@nestjs/common";
import { RolesController } from "./roles.controller";
import { RolesService } from "./roles.service";
import { RolesRepository } from "./roles.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Roles, RolesSchema } from "./roles.schema";

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Roles.name, schema: RolesSchema }],
      process.env.AUTH_DB
    ),
  ],
  controllers: [RolesController],
  providers: [RolesService, RolesRepository],
  exports: [RolesService],
})
export class RolesModule {}
