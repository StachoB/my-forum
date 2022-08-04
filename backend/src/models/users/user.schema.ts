import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Document, DocumentSetOptions } from 'mongoose';
/*
export const ProductSchema = new mongoose.Schema({
    username: { type: String, required: true }, //obligatoire de le remplire avec le required true
    password: { type: String, required: true },
})*/

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

