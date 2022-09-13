import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { Public } from 'src/auth/public.guard';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const canBeCreated: boolean = await this.usersService.insertUser(
      createUserDto.username,
      createUserDto.password,
    );
    return canBeCreated;
  }

  @Public()
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

  @Public()
  @Post('auth')
  async findOneAuth(@Body() createUserDto: CreateUserDto) {
    const found: boolean = await this.usersService.findOneAuth(
      createUserDto.username,
      createUserDto.password,
    );
    return found;
  }

  @Get('userId')
  async finduserId(@Request() req) {
    return req.user.userId;
  }

  @Public()
  @Get(':id')
  async findOneUser(@Param() params) {
    return await this.usersService.getUsername(params.id);
  }

  @Public()
  @Get('username/:username')
  async findOneUserWithUsername(@Param() params) {
    return this.usersService.findOneByUsername(params.username);
  }
}
