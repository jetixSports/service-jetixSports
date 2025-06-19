
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "roles",    })
export class Roles extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true,
   })
  code: string;

  @Prop({ select: false, default: "" })
  __v:number
}

export const RolesSchema = SchemaFactory.createForClass(Roles);
