import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "users" })
export class Users extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ type: String, default: "user" })
  role: string;

  @Prop({ type: String, default: "" }) // Ahora es tipo string en lugar de ObjectId
  _idImg: string;

  @Prop({
    type: String,
    enum: ["active", "inactive", "suspended", "delete"],
    default: "active",
  })
  status: string;

  @Prop({ select: false, default: "" })
  tokenSession?: string;

  @Prop({ select: false, default: "" })
  tokenNotification?: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
