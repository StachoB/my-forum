import { Body, Controller, Get, Param, Request, Post } from '@nestjs/common';
import { Public } from 'src/auth/public.guard';
import io from 'socket.io-client';
import { CreateLikeDto } from 'src/dto/create-like.dto';
import { EventsService } from 'src/services/events.service';
import { LikesService } from 'src/services/likes.service';
import { Server } from 'socket.io';
import { EventsGateway } from 'src/gateway/events.gateway';
import { PublicationsService } from 'src/services/publications.service';
import { Publication } from 'src/models/publications/publication.schema';
import { Like } from 'src/models/likes/like.schema';

@Controller('likes')
export class LikesController {
  constructor(
    private likesService: LikesService,
    private publicationsService: PublicationsService,
    private gateway: EventsGateway,
  ) {}

  @Post()
  async create(@Request() req, @Body() createLikeDto: CreateLikeDto) {
    const isLiked = await this.likesService.isPostLiked(
      createLikeDto.post,
      req.user.userId,
    );
    if (!isLiked) {
      const insertedNewLike = await this.likesService.insertLike(
        createLikeDto.post,
        req.user.userId,
      );
      const insertedLikePost = await this.publicationsService.findOne(
        insertedNewLike.post.toString(),
      );
      const insertedLike: {
        likeId: string;
        postId: string;
        userPostId: string;
      } = {
        likeId: insertedNewLike._id.toString(),
        postId: insertedNewLike.post.toString(),
        userPostId: insertedLikePost._id.toString(),
      };
      this.gateway.server.emit('events', { insertedLike });
    } else {
      const deletedOLdLike = await this.likesService.findLike(
        createLikeDto.post,
        req.user.userId,
      );
      await this.likesService.deleteLike(createLikeDto.post, req.user.userId);
      const deletedLikePost = await this.publicationsService.findOne(
        deletedOLdLike.post.toString(),
      );
      const deletedLike: {
        likeId: string;
        postId: string;
        userPostId: string;
      } = {
        likeId: deletedOLdLike._id.toString(),
        postId: deletedOLdLike.post.toString(),
        userPostId: deletedLikePost._id.toString(),
      };
      this.gateway.server.emit('events', { deletedLike });
    }
  }

  @Public()
  @Get('/:pub_id')
  async findLikesPubli(@Param() params) {
    return this.likesService.findLikesPubli(params.pub_id);
  }

  @Get('/:pub_id/isLiked')
  async isPostLiked(@Request() req, @Param() params) {
    return this.likesService.isPostLiked(params.pub_id, req.user.userId);
  }

  @Get('/numberLikes/total')
  async findTotalLikes(@Request() req) {
    return this.likesService.findTotalLikesUser(req.user.userId);
  }

  @Get('/numberLikes/lastWeek')
  async findLastWeekLikes(@Request() req) {
    return this.likesService.findTotalLikesUserLastWeek(req.user.userId);
  }
}
