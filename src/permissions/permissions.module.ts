
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Permissions, PermissionsSchema } from "./permissions.schema";
import { PermissionsController } from "./permissions.controller";
import { PermissionsService } from "./permissions.service";
import { PermissionsRepository } from "./permissions.repository";

@Global()
@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Permissions.name, schema: PermissionsSchema }],
      process.env.AUTH_DB
    )
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService, PermissionsRepository],
  exports: [PermissionsService],
})
export class PermissionsModule {}
