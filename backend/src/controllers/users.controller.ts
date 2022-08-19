import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFileOptions,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IsPostalCode } from 'class-validator';
import { stringify } from 'querystring';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/models/users/user.schema';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  //insert one user
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const canBeCreated: boolean = await this.usersService.insertUser(
      createUserDto.username,
      createUserDto.password,
    );
    return canBeCreated;
  }

  //get all users
  @Get()
  async findAllUsers() {
    const users: User[] = await this.usersService.findAll();
    return users;
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
    // const user: User = await this.usersService.findOne(params.id);
    // return user;
    const username: string = await this.usersService.getUsername(params.id);
    return username;
  }

  @Get('username/:username')
  async findOneUserWithUsername(@Param() params) {
    const user: User = await this.usersService.findOneByUsername(
      params.username,
    );
    return user;
  }
  /*
    //not  used
    @Patch(':id')
    async updateUser(@Param() params, @Body() changedUser) {
        const updatedUser: User = await this.usersService.updateOne(params.id, changedUser);
        return updatedUser;
    }

    //not used
    @Delete(':id')
    async deleteUser(@Param() params) {
        await this.usersService.deleteOne(params.id)
    }*/
}
