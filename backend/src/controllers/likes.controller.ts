import {
  Body,
  Controller,
  Get,
  Param,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Public } from 'src/auth/public.guard';
import { CreateLikeDto } from 'src/dto/create-like.dto';
import { LikesService } from 'src/services/likes.service';
import { PublicationsService } from 'src/services/publications.service';

@Controller('likes')
export class LikesController {
  constructor(private likesService: LikesService) {}

  @Post()
  async create(@Request() req, @Body() createLikeDto: CreateLikeDto) {
    const isLiked = await this.likesService.isPostLiked(
      createLikeDto.post,
      req.user.userId,
    );
    if (!isLiked) {
      this.likesService.insertLike(createLikeDto.post, req.user.userId);
    } else {
      this.likesService.deleteLike(createLikeDto.post, req.user.userId);
    }
  }

  @Public()
  @Get('/:pub_id')
  async findLikesPubli(@Param() params) {
    return await this.likesService.findLikesPubli(params.pub_id);
  }

  @Get('/:pub_id/isLiked')
  async isPostLiked(@Request() req, @Param() params) {
    return await this.likesService.isPostLiked(params.pub_id, req.user.userId);
  }

  @Get('/numberLikes/total')
  async findTotalLikes(@Request() req) {
    return await this.likesService.findTotalLikesUser(req.user.userId);
  }

  @Get('/numberLikes/lastWeek')
  async findLastWeekLikes(@Request() req) {
    return await this.likesService.findTotalLikesUserLastWeek(req.user.userId);
  }
}
