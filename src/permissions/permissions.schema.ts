import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "permissions" })
export class Permissions extends Document {
    @Prop({ required: true,  })
    code: string;

    @Prop({ required: true, default: true })
    status: boolean;

    @Prop({ required: true, default: [] })
    READ: string[];

    @Prop({ required: true, default: [] })
    UPDATE: string[];

    @Prop({ required: true, default: [] })
    CREATE: string[];

    @Prop({ required: true, default: [] })
    DELETE: string[];

    @Prop({ select: true, default: "" })
    __v:number

}

export const PermissionsSchema = SchemaFactory.createForClass(Permissions);
