import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Public } from 'src/auth/public.guard';
import { CreatePublicationDto } from 'src/dto/create-publication.dto';
import { CommentsService } from 'src/services/comments.service';
import { LikesService } from 'src/services/likes.service';
import { UsersService } from 'src/services/users.service';
import { PublicationsService } from '../services/publications.service';

@Controller('publications')
export class PublicationsController {
  constructor(
    private publicationsService: PublicationsService,
    private commentService: CommentsService,
    private usersService: UsersService,
    private likesService: LikesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createPublicationDto: CreatePublicationDto) {
    this.publicationsService.insertPubli(
      createPublicationDto.title,
      createPublicationDto.text,
      req.user.userId,
    );
  }

  @Get(':id')
  async findOnePubli(@Param() params) {
    return await this.publicationsService.findOne(params.id);
  }

  @Get()
  async findAllPubli() {
    return await this.publicationsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':pub_id')
  async deletePubli(@Request() req, @Param() params) {
    const authorized = await this.publicationsService.deleteOnePubli(
      params.pub_id,
      req.user.userId,
    );
    if (authorized) {
      await this.commentService.deleteComsPubli(params.pub_id);
      await this.likesService.deleteLikesPubli(params.pub_id);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/analytics/pieChartData')
  async findPieChartData() {
    return await this.publicationsService.findDataPieChart();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/analytics/nbPubli')
  async findNumberPubliUser(@Request() req) {
    return await this.publicationsService.countUserPubli(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/analytics/nbPubli/lastWeek')
  async findNumberPubliUserLastWeek(@Request() req) {
    return await this.publicationsService.countUserPubliLastWeek(
      req.user.userId,
    );
  }
}
