import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Publication } from '../publications/publication.schema';
import { User } from '../users/user.schema';

export type LikeDocument = Like & Document;

@Schema()
export class Like {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Publications' })
  post: Publication;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  user: User;

  @Prop({ type: Date })
  date: Date;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
