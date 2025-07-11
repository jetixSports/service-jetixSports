import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "sport_match", timestamps: true })
export class SportMatch extends Document {

  @Prop({ type: String, })
  _idTournament: string;

  @Prop({
    type: [{
      _idTeam: { type: String, required: true },
      _idStream: { type: String, default: "" },
      playersMembers: { type: [String], default: [] },
      score: { type: Number, },
    }]
  })
  teams: {
    _idTeam: string,
    _idStream: string,
    playersMembers:string[],
    score:number,
  }[];

  @Prop({ type: String, })
  _idTeamWinner: string;

  @Prop({
    type: String,
    enum: ["active", "finished",],
    default: "active",
  })
  status: string;

   @Prop({
    type: Number,
  })
  duration: number;

  @Prop({ type: String, })
  typeSport: string;

  @Prop({ type: Date, })
  initMatch: Date;

  @Prop({ select: false, default: "" })
  __v: number;
}
export const SportMatchSchema = SchemaFactory.createForClass(SportMatch);