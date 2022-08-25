import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Comment } from '../models/comments/comment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CommentsService {
  comments: Comment[] = [];

  constructor(
    @InjectModel('Comment') private readonly commentModel: Model<Comment>,
  ) {}

  async insertComment(text: string, user: string, post: string) {
    const newComment = new this.commentModel({
      text: text,
      date: Date.now(),
      user: user,
      post: post,
    });
    this.comments.push(newComment);
    await newComment.save();
  }

  async findAll() {
    const comments = await this.commentModel.find().exec();
    return comments;
  }

  async findComsPubli(publiId: string) {
    return await this.commentModel.find({ post: publiId });
  }

  async deleteComsPubli(publiId: string) {
    await this.commentModel.deleteMany({ post: publiId }).exec();
  }

  async deleteCom(comId: string, userId: string) {
    const comment = await this.commentModel
      .find({ _id: comId, user: userId })
      .exec();
    if (!comment) {
      throw new UnauthorizedException('Unauthorized');
    } else {
      await this.commentModel.deleteOne({ _id: comId }).exec();
    }
  }
}
