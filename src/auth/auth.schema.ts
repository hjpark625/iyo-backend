import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true })
  _id: ObjectId;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  hashedPassword: string;

  @Prop({ type: Date, required: false, default: new Date() })
  createdAt: Date;

  @Prop({ type: Date, required: false, default: null })
  updatedAt: Date | null;

  @Prop({ type: String, required: false, default: null })
  accessToken: string | null;

  @Prop({ type: String, required: false, default: null })
  refreshToken: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
