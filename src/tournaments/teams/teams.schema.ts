import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "teams", timestamps: true })
export class Teams extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: String, default: "" })
  _idImg: string;

  @Prop({ type: [String], default: [] })
  members: string[];

  @Prop({
    type: String,
    enum: ["active", "inactive", "disbanded", "suspended"],
    default: "active",
  })
  status: string;

  @Prop({ type: String, default: "" })
  description: string;

  @Prop({ type: Date, default: Date.now })
  createdDate: Date;

  @Prop({ select: false, default: "" })
  __v: number;
}
export const TeamsSchema = SchemaFactory.createForClass(Teams);
