import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCommentDto } from 'src/dto/create-comment.dto';
import { CommentsService } from '../services/comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  //create a comment
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    this.commentsService.insertComment(
      createCommentDto.text,
      createCommentDto.user,
      createCommentDto.post,
    );
    return 'ok';
  }

  //get all comments
  @Get()
  async findAllComs() {
    const comments = await this.commentsService.findAll();
    return comments;
  }

  @Get(':postId')
  async findComsPubli(@Param() params) {
    const comments = await this.commentsService.findComsPubli(params.postId);
    return comments;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':comId')
  async deleteCom(@Param() params) {
    await this.commentsService.deleteCom(params.comId);
    return 'ok';
  }
}
