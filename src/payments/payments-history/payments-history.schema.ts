// src/payments-history/schemas/payment-history.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'paymentsHistory'
})
export class PaymentsHistory extends Document {
  @Prop({ required: true, type: String })
  _idUser: string;

  @Prop({ required: true, type: String })
  _idTournament: string;

  @Prop({ required: true, type: String })
  _idImg: string;

  @Prop({ required: true, type: String })
  transactionCode: string;

  @Prop({ required: true, type: String })
  _idReceiveDetails: string;

  @Prop({ required: true, type: Number })
  amount: number;

  @Prop({ required: true, type: Number })
  rateExchange: number;

  @Prop({ required: true, type: String })
  currency: string;

  @Prop({ type: Date })
  verifyDate?: Date;

  @Prop({ type: String })
  _idUserVerify?: string;

  @Prop({ required: true, type: String, enum: ["accept", "delete", "denied", "pending"],
    default: "pending", })
  status: string;
}

export const PaymentsHistorySchema = SchemaFactory.createForClass(PaymentsHistory);