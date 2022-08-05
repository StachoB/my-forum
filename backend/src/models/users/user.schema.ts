import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Document, DocumentSetOptions } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends mongoose.Document {
    @Prop()
    username: string;

    @Prop()
    password: string;

    /*constructor(username: string, password: string) {

    }*/
}

export const UsersSchema = SchemaFactory.createForClass(User);

