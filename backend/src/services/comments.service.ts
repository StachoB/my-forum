import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from '../models/comments/comment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CommentsService {
    comments: Comment[] = [];

    constructor(@InjectModel('Comment') private readonly commentModel: Model<Comment>) { }


    async insertComment(text: string, user: string, post: string) {
        const newComment: Comment = new this.commentModel({ text: text, date: Date.now(), user: user, post: post });
        this.comments.push(newComment);
        await newComment.save();
    }

    async findAll() {
        const comments = await this.commentModel.find().exec();
        return comments;
    }

    async findComsPubli(publiId: string) {
        const comments = await this.commentModel.find({ "post": publiId });
        console.log(comments);
        if (comments.length == 0) {
            return "aucun commentaires pour cette publication";
        }
        else {
            return comments;
        }
    }

    async deleteComsPubli(publiId: string) {
        await this.commentModel.deleteMany({ "post": publiId }).exec()
    }


}