import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreatePublicationDto } from 'src/dto/create-publication.dto';
import { Publication } from 'src/models/publications/publication.schema';
import { PublicationsService } from '../services/publications.service';

@Controller('publications')
export class PublicationsController {
    constructor(private publicationsService: PublicationsService) {
    }

    //poster une publication
    @Post()
    create(@Body() createPublicationDto: CreatePublicationDto) {
        this.publicationsService.insertPubli(createPublicationDto.title, createPublicationDto.text, createPublicationDto.user);
    }

    //obtenir toutes les publications
    @Get()
    async findAllPubli() {
        const publications = await this.publicationsService.findAll();
        return publications;
    }

    //supp une publication qui nous appartient
    @Delete(':pub_id')
    async deletePubli(@Param() params) {
        await this.publicationsService.deleteOnePubli(params.id)
    }



}