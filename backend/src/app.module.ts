import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LikesController } from './controllers/likes.controller';
import { LikesService } from './services/likes.service';
import { LikeSchema } from './models/likes/like.schema';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { SseController } from './controllers/sse.controller';
import { EventsService } from './services/events.service';
import { EventsGateway } from './gateway/events.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    AuthModule,
    MongooseModule.forRoot(process.env.MONGODB_BDD),
    MongooseModule.forFeature([
      { name: 'User', schema: UsersSchema },
      { name: 'Publication', schema: PublicationsSchema },
      { name: 'Comment', schema: CommentSchema },
      { name: 'Like', schema: LikeSchema },
    ]),
  ],
  controllers: [
    AppController,
    PublicationsController,
    UsersController,
    CommentsController,
    LikesController,
    SseController,
  ],
  providers: [
    AppService,
    PublicationsService,
    UsersService,
    CommentsService,
    LikesService,
    EventsService,
    EventsGateway,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
