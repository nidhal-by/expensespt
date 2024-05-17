import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: mongoose.Types.ObjectId;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop({ required: true })
  mail: string;

  @Prop()
  password: string;

  @Prop()
  budget: Array<any>;

  @Prop()
  alerts: Array<any>;
}

export const UserSchema = SchemaFactory.createForClass(User);
