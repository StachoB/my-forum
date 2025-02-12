import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  [x: string]: any;

  @Prop()
  username: string;

  @Prop()
  password: string;
}

export const UsersSchema = SchemaFactory.createForClass(User);
