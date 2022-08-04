import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from '../models/comments/comment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CommentsService {
    comments: Comment[] = [];

    constructor(@InjectModel('Comment') private readonly commentModel: Model<Comment>) { }

    create(comment: Comment) {
        this.comments.push(comment);
    }

    async insertComment(text: string, user: string, post: string) {
        const newComment: Comment = new this.commentModel({ text: text, date: Date.now(), user: user, post: post });
        this.comments.push(newComment);
        const result = await newComment.save();
    }

    async findAll() {
        const comments = await this.commentModel.find().exec();
        console.log(comments);
        return comments;
    }

    async findComsPubli(postId) {
        const comments = await this.commentModel.find({ "post": postId });
        console.log(comments);
        if (comments.length == 0) {
            return "aucun commentaires pour cette publication";
        }
        else {
            return comments;
        }
    }


}