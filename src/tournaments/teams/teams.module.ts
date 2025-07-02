import { Module } from "@nestjs/common";
import { TeamsController } from "./teams.controller";
import { TeamsService } from "./teams.service";
import { TeamsRepository } from "./teams.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Teams, TeamsSchema } from "./teams.schema";
import { ImagesModule } from "src/utils/images/images.module";

@Module({
  imports: [
    ImagesModule,
    MongooseModule.forFeature(
      [{ name: Teams.name, schema: TeamsSchema }],
      process.env.TOURNAMENTS_DB
    ),
  ],
  controllers: [TeamsController],
  providers: [TeamsService, TeamsRepository],
  exports: [TeamsService],
})
export class TeamsModule {}