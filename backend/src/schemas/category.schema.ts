import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  color: string;

  @Prop()
  icon: string;

  @Prop({ default: false })
  default: boolean;

  @Prop({ default: null })
  user: string;

  versionKey: false;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
