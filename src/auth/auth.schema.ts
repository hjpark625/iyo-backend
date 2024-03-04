import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, type ObjectId } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: mongoose.Types.ObjectId, required: true })
  _id: ObjectId;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  nickname: string;

  @Prop({ type: String, required: true })
  hashedPassword: string;

  @Prop({ type: Date, required: false, default: new Date() })
  createdAt: Date;

  @Prop({ type: Date, required: false, default: null })
  updatedAt: Date | null;

  @Prop({ type: String, required: false, default: null })
  refreshToken: string | null;

  @Prop({ type: Boolean, required: false, default: false })
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
