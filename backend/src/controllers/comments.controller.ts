import { Body, Controller, Delete, Get, Param, ParseFileOptions, Patch, Post } from '@nestjs/common';
import { CreateCommentDto } from 'src/dto/create-comment.dto';
import { CommentsService } from '../services/comments.service';

@Controller('comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) {

    }

    //creer un commentaire
    @Post()
    create(@Body() createCommentDto: CreateCommentDto) {
        this.commentsService.insertComment(createCommentDto.text, createCommentDto.user, createCommentDto.post)
    }

    //obtenir toutes les commentaires
    @Get()
    async findAllComs() {
        const comments = await this.commentsService.findAll();
        return comments;
    }

    @Get(':postId')
    async findComsPubli(@Param() params) {
        const comments = await this.commentsService.findComsPubli(params.postId);
        return comments
    }

    //a utiliser si je décide de faire en deux étapes
    @Delete(':publiId')
    async deleteCom(@Param() params) {
        await this.commentsService.deleteComsPubli(params.publiId)
    }

}