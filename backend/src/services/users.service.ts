import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../models/users/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  users: User[] = [];

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async insertUser(username: string, password: string): Promise<boolean> {
    const user = await this.userModel.findOne({ username: username });
    if (!user) {
      const newUser = new this.userModel({
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
    let finalUsers: { _id: string; username: string }[] = [];
    await Promise.all(
      users.map(async (user) => {
        finalUsers.push({ _id: user._id, username: user.username });
      }),
    );
    return finalUsers;
  }

  async findOne(id: string): Promise<User> {
    let user: User;
    user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('Could not find user bye');
    }
    return user;
  }

  async getUsername(userId: string): Promise<string> {
    let user: User;
    user = await this.userModel.findById(userId);
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
    user = await this.userModel.findOne({ username: username });
    if (!user) {
      throw new NotFoundException('No existing account with this username.');
    } else {
      user = await this.userModel.findOne({
        username: username,
        password: password,
      });
      if (!user) {
        throw new NotFoundException('Could not find user');
      }
      return true;
    }
  }
}
