import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Like, LikeDocument } from 'src/models/likes/like.schema';
import { PublicationsService } from './publications.service';

@Injectable()
export class LikesService {
  likes: Like[] = [];

  constructor(
    @InjectModel('Like')
    private readonly likeModel: Model<LikeDocument>,
  ) {}

  async insertLike(post: string, user: string) {
    const newLike = await new this.likeModel({
      post: post,
      user: user,
      date: Date.now(),
    });
    return await newLike.save();
  }

  async deleteLike(post: string, user: string) {
    return await this.likeModel.deleteOne({ post: post, user: user }).exec();
  }

  async deleteLikesPubli(publiId: string) {
    await this.likeModel.deleteMany({ post: publiId }).exec();
  }

  async findTotalLikesUser(userId: string) {
    let userIdObj = new mongoose.Types.ObjectId(userId);
    let pipeline = [
      {
        $lookup: {
          from: 'publications',
          localField: 'post',
          foreignField: '_id',
          as: 'author',
        },
      },
      {
        $project: {
          author: { $first: '$author.user' },
        },
      },
      {
        $match: {
          author: userIdObj,
        },
      },
    ];
    const res = await this.likeModel.aggregate(pipeline).exec();
    return res.length;
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

  async findLike(post: string, user: string) {
    const like = await this.likeModel
      .findOne({
        post: post,
        user: user,
      })
      .exec();
    return like;
  }

  async findTotalLikesUserLastWeek(userId: string) {
    let userIdObj = new mongoose.Types.ObjectId(userId);
    let pipeline = [
      {
        $match: {
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
        },
      },
      {
        $lookup: {
          from: 'publications',
          localField: 'post',
          foreignField: '_id',
          as: 'author',
        },
      },
      {
        $project: {
          author: { $first: '$author.user' },
        },
      },
      {
        $match: {
          author: userIdObj,
        },
      },
    ];
    const totalLikesLastWeek = await this.likeModel.aggregate(pipeline).exec();
    return totalLikesLastWeek.length;
  }
}
