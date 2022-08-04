import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Publication } from '../models/publications/publication.schema';
import { Model } from 'mongoose';

@Injectable()
export class PublicationsService {
    publications: Publication[] = [];

    constructor(@InjectModel('Publication') private readonly publicationModel: Model<Publication>) { }

    create(publication: Publication) {
        this.publications.push(publication);
    }

    async findAll() {
        const publications = await this.publicationModel.find().exec();
        return publications;
    }

    async insertPubli(title: string, text: string, user: string) {
        const newPublication: Publication = new this.publicationModel({ title: title, text: text, date: Date.now(), user: user });
        this.publications.push(newPublication);
        const result = await newPublication.save();
        //return result;
    }

    async deleteOnePubli(id: string) {
        await this.publicationModel.deleteOne({ "_id": id }).exec()
    }


}