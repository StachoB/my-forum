import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../models/users/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { stringify } from 'querystring';

@Injectable()
export class UsersService {
    users: User[] = [];


    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async insertUser(username: string, password: string) {
        const newUser: User = new this.userModel({ username: username, password: password });
        this.users.push(newUser);
        await newUser.save();
    }

    async findAll() {
        const users: User[] = await this.userModel.find().exec();
        return users;
    }

    async findOne(id: string): Promise<User> {
        let user: User;
        try {
            user = await this.userModel.findById(id);
        }
        catch (error) {
            throw new NotFoundException('Could not find user');
        }
        if (!user) {
            throw new NotFoundException('Could not find user');
        }
        return user;
    }

    async findOneByUsername(username: string): Promise<User> {
        let user: User;
        try {
            user = await this.userModel.findOne({ "username": username });
        }
        catch (error) {
            throw new NotFoundException('Could not find user');
        }
        if (!user) {
            throw new NotFoundException('Could not find user');
        }
        return user;
    }




    /*
    async updateOne(username: string, toUpdateUser: User) {
        const updatedUser: User = await this.findOne(username);
        if (toUpdateUser.username) {
            updatedUser.username = toUpdateUser.username;
        }
        if (toUpdateUser.password) {
            updatedUser.password = toUpdateUser.password;
        }
        updatedUser.save();
        return updatedUser;
    }*/



}