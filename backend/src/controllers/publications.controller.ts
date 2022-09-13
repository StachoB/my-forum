import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Request,
  Post,
} from '@nestjs/common';
import { Public } from 'src/auth/public.guard';
import { CreatePublicationDto } from 'src/dto/create-publication.dto';
import { EventsGateway } from 'src/gateway/events.gateway';
import { CommentsService } from 'src/services/comments.service';
import { EventsService } from 'src/services/events.service';
import { LikesService } from 'src/services/likes.service';
import { PublicationsService } from '../services/publications.service';

@Controller('publications')
export class PublicationsController {
  constructor(
    private publicationsService: PublicationsService,
    private commentService: CommentsService,
    private likesService: LikesService,
    private eventsService: EventsService,
    private gateway: EventsGateway,
  ) {}

  @Post()
  async create(
    @Request() req,
    @Body() createPublicationDto: CreatePublicationDto,
  ) {
    const insertedPubli = await this.publicationsService.insertPubli(
      createPublicationDto.title,
      createPublicationDto.text,
      req.user.userId,
    );
    await this.eventsService.emitPubli({
      insertedPubli,
    });
  }

  @Public()
  @Get(':id')
  async findOnePubli(@Param() params) {
    return this.publicationsService.findOne(params.id);
  }

  @Public()
  @Get()
  async findAllPubli() {
    return this.publicationsService.findAll();
  }

  @Delete(':pub_id')
  async deletePubli(@Request() req, @Param() params) {
    const allPubli = await this.findAllPubli();
    const index = await allPubli.findIndex(
      (x) => x._id.toString() === params.pub_id,
    );
    const authorized = await this.publicationsService.deleteOnePubli(
      params.pub_id,
      req.user.userId,
    );
    if (authorized) {
      await this.commentService.deleteComsPubli(params.pub_id);
      await this.likesService.deleteLikesPubli(params.pub_id);
      await this.eventsService.emitPubli({
        deletedPubli: params.pub_id,
      });
    }
  }

  @Get('/analytics/pieChartData')
  async findPieChartData() {
    return this.publicationsService.findDataPieChart();
  }

  @Get('/analytics/nbPubli')
  async findNumberPubliUser(@Request() req) {
    return this.publicationsService.countUserPubli(req.user.userId);
  }

  @Get('/analytics/nbPubli/lastWeek')
  async findNumberPubliUserLastWeek(@Request() req) {
    return this.publicationsService.countUserPubliLastWeek(req.user.userId);
  }
}
