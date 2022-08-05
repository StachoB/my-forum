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
import { AuthService } from './auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://barbaraStachowicz:Cmdmad123@moncluster.qq6yauh.mongodb.net/Forum?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([
      { name: 'User', schema: UsersSchema },
      { name: 'Publication', schema: PublicationsSchema },
      { name: 'Comment', schema: CommentSchema },
    ]),
  ],
  controllers: [
    AppController,
    PublicationsController,
    UsersController,
    CommentsController,
  ],
  providers: [AppService, PublicationsService, UsersService, CommentsService],
})
export class AppModule {}
