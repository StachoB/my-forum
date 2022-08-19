import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePublicationDto } from 'src/dto/create-publication.dto';
import { Publication } from 'src/models/publications/publication.schema';
import { CommentsService } from 'src/services/comments.service';
import { PublicationsService } from '../services/publications.service';

@Controller('publications')
export class PublicationsController {
  constructor(
    private publicationsService: PublicationsService,
    private commentService: CommentsService,
  ) {}

  //post a publication
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPublicationDto: CreatePublicationDto) {
    this.publicationsService.insertPubli(
      createPublicationDto.title,
      createPublicationDto.text,
      createPublicationDto.user,
    );
    return 'ok';
  }

  //get a publication
  @Get(':id')
  async findAllPubli(@Param() params) {
    const publication = await this.publicationsService.findOne(params.id);
    return publication;
  }

  @Get()
  async findOnePubli() {
    const publications = await this.publicationsService.findAll();
    return publications;
  }

  //delete a publication
  @UseGuards(JwtAuthGuard)
  @Delete(':pub_id')
  async deletePubli(@Param() params) {
    await this.publicationsService.deleteOnePubli(params.pub_id);
    await this.commentService.deleteComsPubli(params.pub_id);
    return 'ok';
  }
}
