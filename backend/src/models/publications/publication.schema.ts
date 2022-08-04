import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, DocumentSetOptions } from 'mongoose';
import { User } from '../users/user.schema';

export type PublicationDocument = Publication & Document;

@Schema()
export class Publication extends mongoose.Document {
    @Prop()
    title: string;

    @Prop()
    text: string;

    @Prop({ type: Date })
    date: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
    user: User

}

export const PublicationsSchema = SchemaFactory.createForClass(Publication);