import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Public } from 'src/auth/public.guard';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/models/users/user.schema';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const canBeCreated: boolean = await this.usersService.insertUser(
      createUserDto.username,
      createUserDto.password,
    );
    return canBeCreated;
  }

  @Get()
  async findAllUsers() {
    let users = await this.usersService.findAll();
    let finalUsers: { _id: string; username: string }[] = [];
    await Promise.all(
      users.map(async (user) => {
        finalUsers.push({ _id: user._id, username: user.username });
      }),
    );
    console.log(finalUsers);
    return finalUsers;
  }

  @Post('auth')
  async findOneAuth(@Body() createUserDto: CreateUserDto) {
    const found: boolean = await this.usersService.findOneAuth(
      createUserDto.username,
      createUserDto.password,
    );
    return found;
  }

  @Get(':id')
  async findOneUser(@Param() params) {
    return await this.usersService.getUsername(params.id);
  }

  @Get('username/:username')
  async findOneUserWithUsername(@Param() params) {
    return await this.usersService.findOneByUsername(params.username);
  }
}
