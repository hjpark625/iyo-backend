import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

@Schema()
export class Detail extends Document {
  @Prop({ type: String, required: true })
  _id: ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  engName: string;

  @Prop({ type: String, nullable: true })
  category?: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String, required: false, default: null })
  detailAddress: string | null;

  @Prop({ type: Object, required: false, default: null })
  nearestRoute: {
    subwayLine: string[] | null;
    routeInfo: string | null;
  } | null;

  @Prop({ type: Array, required: true })
  operationTime: {
    day: string;
    startTime: string | null;
    endTime: string | null;
  }[];

  @Prop({ type: String, required: false, default: null })
  phoneNumber: string | null;

  @Prop({ type: Number, required: true })
  lat: number;

  @Prop({ type: Number, required: true })
  lng: number;

  @Prop({ type: String, required: false, default: null })
  description: string | null;

  @Prop({ type: Date, required: true })
  updatedAt: Date;
}

export const DetailSchema = SchemaFactory.createForClass(Detail);
