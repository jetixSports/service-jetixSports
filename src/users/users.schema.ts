import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "users",timestamps: true  })
export class Users extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true,
    set: (email: string) => email.toLowerCase().trim(),
   })
  email: string;

  @Prop({ required: true,  })
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

  @Prop({  default: "" })
  tokenSession?: string;

  @Prop({  default: "" })
  tokenNotification?: string;

  @Prop({ select: false, default: "" })
  __v:number
}

export const UsersSchema = SchemaFactory.createForClass(Users);
