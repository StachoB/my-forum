import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
    const publications = await this.publicationModel
      .find()
      .sort({ date: -1 })
      .exec();
    return publications;
  }

  async findAllPubliUser(userId: string): Promise<Publication[]> {
    const publications: any = await this.publicationModel
      .find({ user: userId })
      .exec();
    return publications;
  }

  async findOne(id: string): Promise<Publication> {
    let publication: Publication;
    publication = await this.publicationModel.findById(id);
    if (!publication) {
      throw new NotFoundException('Could not find publication');
    }
    return publication;
  }

  async insertPubli(title: string, text: string, user: string) {
    const newPublication = new this.publicationModel({
      title: title,
      text: text,
      date: Date.now(),
      user: user,
    });
    return await newPublication.save();
  }

  async deleteOnePubli(id: string, userId: string) {
    const publication = await this.publicationModel
      .find({ _id: id, user: userId })
      .exec();
    if (!publication) {
      throw new UnauthorizedException('Unauthorized');
    } else {
      await this.publicationModel.deleteOne({ _id: id }).exec();
      return true;
    }
  }

  async countUserPubli(userId: string) {
    const nbPubli = await this.publicationModel
      .countDocuments({
        user: userId,
      })
      .exec();
    return nbPubli;
  }

  async countUserPubliLastWeek(userId: string) {
    const nbPubli = await this.publicationModel
      .countDocuments({
        user: userId,
        $expr: {
          $gt: [
            '$date',
            {
              $dateSubtract: {
                startDate: '$$NOW',
                unit: 'day',
                amount: 7,
              },
            },
          ],
        },
      })
      .exec();
    return nbPubli;
  }

  async findDataPieChart() {
    var pipeline = [
      {
        $group: {
          _id: '$user',
          total_posts: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $project: {
          total_posts: 1,
          _id: { $first: '$user.username' },
        },
      },
    ];
    const usersPubli: { _id; total_posts }[] = await this.publicationModel
      .aggregate(pipeline)
      .exec();
    return usersPubli;
  }
}
