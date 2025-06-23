import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "currency" })
export class Currency extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    code: string;

    @Prop({ required: true })
    shortname: string;

    @Prop({ required: true, enum: ['active', 'inactive', 'delete'], default: 'active' })
    status: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop({ select: true, default: "" })
    __v: number;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);