import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../models/users/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { stringify } from 'querystring';

@Injectable()
export class UsersService {
  users: User[] = [];

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async insertUser(username: string, password: string): Promise<boolean> {
    const user: User = await this.userModel.findOne({ username: username });
    if (!user) {
      const newUser: User = new this.userModel({
        username: username,
        password: password,
      });
      this.users.push(newUser);
      await newUser.save();
      return true;
    } else {
      throw new Error('Username already taken by another account.');
    }
  }

  async findAll() {
    const users: User[] = await this.userModel.find().exec();
    return users;
  }

  async findOne(id: string): Promise<User> {
    let user: User;
    try {
      user = await this.userModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find user');
    }
    if (!user) {
      throw new NotFoundException('Could not find user');
    }
    return user;
  }

  async getUsername(userId: string): Promise<string> {
    let user: User;
    try {
      user = await this.userModel.findById(userId);
    } catch (error) {
      throw new NotFoundException('Could not find user');
    }
    if (!user) {
      throw new NotFoundException('Could not find user');
    }
    return user.username;
  }

  async findOneByUsername(username: string): Promise<User> {
    let user: User;
    try {
      user = await this.userModel.findOne({ username: username });
    } catch (error) {
      throw new NotFoundException('Could not find user');
    }
    if (!user) {
      throw new NotFoundException('Could not find user');
    }
    return user;
  }

  async findOneAuth(username: string, password: string): Promise<boolean> {
    let user: User;
    try {
      user = await this.userModel.findOne({ username: username });
    } catch (error) {
      throw new NotFoundException('Could not find user');
    }
    if (!user) {
      throw new NotFoundException('No existing account with this username.');
    } else {
      try {
        user = await this.userModel.findOne({
          username: username,
          password: password,
        });
      } catch (error) {
        throw new NotFoundException('Could not find user');
      }
      if (!user) {
        throw new NotFoundException('Could not find user');
      }
      return true;
    }
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
