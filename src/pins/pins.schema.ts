import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import type { ObjectId } from 'mongoose';

@Schema()
export class Pins extends Document {
  @Prop({ type: Array, required: true })
  pins!: {
    _id: ObjectId;
    lat: number;
    lng: number;
    name: string;
    engName: string;
  }[];
}

export const PinsSchema = SchemaFactory.createForClass(Pins);
