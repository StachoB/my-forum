import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../users/user.schema';
import { Publication } from '../publications/publication.schema';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop()
  text: String;

  @Prop()
  date: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Publication' })
  post: Publication;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
