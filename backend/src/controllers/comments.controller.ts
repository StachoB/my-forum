import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Public } from 'src/auth/public.guard';
import { CreateCommentDto } from 'src/dto/create-comment.dto';
import { CommentsService } from '../services/comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  create(@Request() req, @Body() createCommentDto: CreateCommentDto) {
    this.commentsService.insertComment(
      createCommentDto.text,
      req.user.userId,
      createCommentDto.post,
    );
  }

  @Public()
  @Get()
  async findAllComs() {
    return await this.commentsService.findAll();
  }

  @Public()
  @Get(':postId')
  async findComsPubli(@Param() params) {
    return await this.commentsService.findComsPubli(params.postId);
  }

  @Delete(':comId')
  async deleteCom(@Request() req, @Param() params) {
    await this.commentsService.deleteCom(params.comId, req.user.userId);
  }
}
