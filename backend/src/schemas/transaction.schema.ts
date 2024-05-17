import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema()
export class Transaction {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ default: 0 })
  amount: number;

  @Prop()
  date: Date;

  @Prop()
  category: string;

  @Prop()
  description: string;

  @Prop({ type: String, enum: ['INCOME', 'EXPENSE'] })
  type;

  @Prop({ type: Array })
  tags;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
