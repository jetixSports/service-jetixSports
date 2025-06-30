import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "invitation" })
export class Invitation extends Document {
    @Prop({ required: true,  })
    teamId: string;

    @Prop({ required: true,})
    userId: string;

    @Prop({ required: true,})
    invitorId: string;

    @Prop({ required: true, default: 'pending' })
     status: 'pending' | 'accepted' | 'denied';

}

export const InvitationSchema = SchemaFactory.createForClass(Invitation);


