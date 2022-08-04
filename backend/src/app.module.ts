import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublicationsController } from './controllers/publications.controller';
import { UsersController } from './controllers/users.controller';
import { UsersSchema } from './models/users/user.schema';
import { PublicationsSchema } from './models/publications/publication.schema';
import { PublicationsService } from './services/publications.service';
import { UsersService } from './services/users.service';
import { CommentSchema } from './models/comments/comment.schema';
import { CommentsController } from './controllers/comments.controller';
import { CommentsService } from './services/comments.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://barbaraStachowicz:Cmdmad123@moncluster.qq6yauh.mongodb.net/Forum?retryWrites=true&w=majority'), MongooseModule.forFeature([{ name: 'User', schema: UsersSchema }]), MongooseModule.forFeature([{ name: 'Publication', schema: PublicationsSchema }]), MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }])],
  controllers: [AppController, PublicationsController, UsersController, CommentsController],
  providers: [AppService, PublicationsService, UsersService, CommentsService],
})
export class AppModule { }
