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

    /*create(createUserDto: CreateUserDto) {
        let newUser: User;
        newUser.username = createUserDto.username;
        newUser.password = createUserDto.password;
        console.log(createUserDto.username);
        this.users.push(newUser);
        this.insertUser(newUser.username, newUser.password);
        this.insertUser(createUserDto.username, createUserDto.password);
    }*/

    async insertUser(username: string, password: string) {
        const newUser: User = new this.userModel({ username: username, password: password });
        //console.log('the new user is ', newUser);
        this.users.push(newUser);
        const result = await newUser.save();
    }

    async findAll() {
        const users: User[] = await this.userModel.find().exec();
        console.log(users);
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
    }

    async deleteOne(id: string) {
        await this.userModel.deleteOne({ "_id": id }).exec()
    }


}