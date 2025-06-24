import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "images", })
export class Images extends Document {

  @Prop({
    type: String
  })
  _idUser: string;

  @Prop({
    type: String,
    enum: ["active", "inactive", "delete"],
    default: "active",
  })
  status: string;

  @Prop({
    type: String,
    enum: ["profile", "tournaments", "pay", "default"],
  })
  type: string;

}

export const ImagesSchema = SchemaFactory.createForClass(Images);
