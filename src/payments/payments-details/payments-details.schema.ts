import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
class Details {
   @Prop({ required: true})
    email?:string;
    
    @Prop({ required: true})
    identity?:string;

    @Prop({ required: true})
    bank?:string;

    @Prop({ required: true})
    phoneNumber?:string;
}
@Schema({ collection: "paymentsDetails", })
export class PaymentsDetails extends Document {
    @Prop({ required: true, })
    _idUser: string;

    @Prop({ required: true, enum: ['bank_transfer', 'binance', 'mobile_payment'] })
    typePay: string;

    @Prop({ required: true, enum: ['active', 'inective', 'delete'],default:'active' })
    status: string;

    @Prop({ required: true})
    details:Details;

    @Prop({ select: true, default: "" })
    __v: number

}

export const PaymentsDetailsSchema = SchemaFactory.createForClass(PaymentsDetails);
