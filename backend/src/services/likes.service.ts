import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Like } from 'src/models/likes/like.schema';
import { PublicationsService } from './publications.service';

@Injectable()
export class LikesService {
  likes: Like[] = [];

  constructor(
    @InjectModel('Like')
    private readonly likeModel: Model<Like>,
    private readonly publicationService: PublicationsService,
  ) {}

  async insertLike(post: string, user: string) {
    const newLike = new this.likeModel({
      post: post,
      user: user,
      date: Date.now(),
    });
    await newLike.save();
  }

  async deleteLike(post: string, user: string) {
    await this.likeModel.deleteOne({ post: post, user: user }).exec();
  }

  async deleteLikesPubli(publiId: string) {
    await this.likeModel.deleteMany({ post: publiId }).exec();
  }

  async findTotalLikesUser(userId: string) {
    const publications = await this.publicationService.findAllPubliUser(userId);
    var totalLikes = 0;
    await Promise.all(
      publications.map(async (publi) => {
        const number = await this.findLikesPubli(publi._id.toString());
        totalLikes += number;
      }),
    );
    return totalLikes;
  }

  async findLikesPubli(post: string): Promise<number> {
    const nbLike = await this.likeModel
      .countDocuments({
        post: post,
      })
      .exec();
    return nbLike;
  }

  async isPostLiked(post: string, user: string): Promise<boolean> {
    const nbLike = await this.likeModel
      .countDocuments({
        post: post,
        user: user,
      })
      .exec();
    return nbLike == 0 ? false : true;
  }

  async findTotalLikesUserLastWeek(userId: string) {
    const publications = await this.publicationService.findAllPubliUser(userId);
    var totalLikes = 0;
    await Promise.all(
      publications.map(async (publi) => {
        const number = await this.findLikesPubliLastWeek(publi._id.toString());
        totalLikes += number;
      }),
    );
    return totalLikes;
  }

  async findLikesPubliLastWeek(post: string): Promise<number> {
    const nbLike = await this.likeModel
      .countDocuments({
        post: post,
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
    return nbLike;
  }
}
