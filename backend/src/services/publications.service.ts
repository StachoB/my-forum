import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Publication } from '../models/publications/publication.schema';
import { Model } from 'mongoose';

@Injectable()
export class PublicationsService {
  publications: Publication[] = [];

  constructor(
    @InjectModel('Publication')
    private readonly publicationModel: Model<Publication>,
  ) {}

  async findAll() {
    const publications = await this.publicationModel.find().exec();
    return publications;
  }

  async findOne(id: string): Promise<Publication> {
    let publication: Publication;
    try {
      publication = await this.publicationModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find publication');
    }
    if (!publication) {
      throw new NotFoundException('Could not find publication');
    }
    return publication;
  }

  async insertPubli(title: string, text: string, user: string) {
    const newPublication: Publication = new this.publicationModel({
      title: title,
      text: text,
      date: Date.now(),
      user: user,
    });
    this.publications.push(newPublication);
    await newPublication.save();
  }

  async deleteOnePubli(id: string) {
    await this.publicationModel.deleteOne({ _id: id }).exec();
  }
}
