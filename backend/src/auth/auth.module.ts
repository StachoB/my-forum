import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UsersSchema } from 'src/models/users/user.schema';
import { UsersService } from 'src/services/users.service';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UsersSchema }]),
  ],
  providers: [AuthService, LocalStrategy, UsersService, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
