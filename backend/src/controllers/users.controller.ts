import { Body, Controller, Delete, Get, Param, ParseFileOptions, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/models/users/user.schema';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    //ajouter un utilisateur
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        console.log('nouvel utilisateur', CreateUserDto);
        this.usersService.insertUser(createUserDto.username, createUserDto.password);
    }

    //obtenir tous les utilisateurs
    @Get()
    async findAllUsers() {
        const users: User[] = await this.usersService.findAll();
        return users
    }

    @Get(':id')
    async findOneUser(@Param() params) {
        const user: User = await this.usersService.findOne(params.id);
        return user
    }

    //pas utilisé ici
    @Patch(':id')
    async updateUser(@Param() params, @Body() changedUser) {
        const updatedUser: User = await this.usersService.updateOne(params.id, changedUser);
        return updatedUser;
    }

    //pas utilisé ici
    @Delete(':id')
    async deleteUser(@Param() params) {
        await this.usersService.deleteOne(params.id)
    }

}