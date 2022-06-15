import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Req } from '@nestjs/common';
import { Request } from 'express';

import { User } from './user.entity'
import { UserService } from './user.service';
import { UserCreateInput } from './dto/create-user.input';
import { UserUpdateInput } from './dto/update-user.input';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async findAllUsers(): Promise<User[]> {
    const users = await this.userService.findAllUsers();

    return users;
  }

  @Query(() => User)
  async findUserById(@Args('id') id: number): Promise<User> {
    const user = await this.userService.findUserById(id);

    return user;
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: UserCreateInput): Promise<User> {
    const user = await this.userService.createUser(data);

    return user;
  }

  @Mutation(() => User)
  async updateUser(@Req() req: Request, @Args('data') data: UserUpdateInput): Promise<User> {
    const authenticatedUserId = req.headers.authenticatedUserId;
    const user = await this.userService.updateUser(Number(authenticatedUserId), data);

    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: number): Promise<true> {
    await this.userService.deleteUser(id);

    return true;
  }
}
