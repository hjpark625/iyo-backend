import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, type ObjectId } from 'mongoose';

@Schema()
export class Detail extends Document {
  @Prop({ type: mongoose.Types.ObjectId, required: true })
  _id: ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  engName: string;

  @Prop({ type: String, required: false, default: null })
  socialLink: string | null;

  @Prop({ type: String, required: false, default: null })
  category?: string | null;

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

  @Prop({ type: Object, required: true })
  coord: { lat: number; lng: number };

  @Prop({ type: String, required: false, default: null })
  description: string | null;

  @Prop({ type: String, required: false, default: null })
  introduce: string | null;

  @Prop({ type: Array, required: false, default: () => [] })
  concept: string[];

  @Prop({ type: Date, required: true })
  updatedAt: Date;

  @Prop({ type: Array, required: false, default: () => [] })
  storeImages: {
    file_path: string;
    photoId: ObjectId;
    width: number;
    height: number;
  }[];
}

export const DetailSchema = SchemaFactory.createForClass(Detail);
