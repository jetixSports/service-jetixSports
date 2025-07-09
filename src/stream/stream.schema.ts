// src/schemas/your-model.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Stream extends Document {
  @Prop({ type: String, required: true })
  _idTournament: string;

  @Prop({ type: String,})
  _idMatch: string;

  @Prop({ type: String, })
  _idTeam: string;

  @Prop({ type: String, })
  _idUser: string;

  @Prop({ type: String, required: true })
  URL: string;

  @Prop({ type: String, required: true })
  status: string;
}

export const StreamSchema = SchemaFactory.createForClass(Stream);