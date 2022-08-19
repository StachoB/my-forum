import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/users/user.schema';
import { UsersService } from 'src/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user: User = await this.usersService.findOneByUsername(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return user;
    } else {
      throw new NotFoundException('could not find user');
    }
    //return null;
  }

  async login(username, userId) {
    const payload = { username: username, sub: userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findUser(id) {
    const user: User = await this.usersService.findOne(id);
    return user;
  }
}
