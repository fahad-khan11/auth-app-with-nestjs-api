import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User { 
  _id: Types.ObjectId;

  @Prop({ type: String, required: true, minlength: 3 })
  firstname: string;

  @Prop({ type: String, required: true, minlength: 3 })
  lastname: string;

  @Prop({ type: String, required: true, unique: true, minlength: 5 })
  email: string;

  @Prop({ type: String, required: true, select: false })
  password: string;


}

export const UserSchema = SchemaFactory.createForClass(User);
