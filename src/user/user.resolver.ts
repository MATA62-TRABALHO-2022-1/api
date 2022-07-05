import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { User } from './user.entity'
import { UserService } from './user.service';
import { UserCreateInput } from './dto/create-user.input';
import { UserUpdateInput } from './dto/update-user.input';
import { UserUpdatePasswordInput } from './dto/update-user-password.input';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async findAllUsers(): Promise<User[]> {
    const users = await this.userService.findAll();

    return users;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async findUserById(@Args('id') id: number): Promise<User> {
    const user = await this.userService.findById(id);

    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async createUser(@Args('data') data: UserCreateInput): Promise<User> {
    const user = await this.userService.create(data);

    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(@Context() ctx, @Args('data') data: UserUpdateInput): Promise<User> {
    const authenticatedUserId = Number(ctx.req.headers.authenticateduserid);
    const user = await this.userService.update(authenticatedUserId, data);

    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUserPassword(@Context() ctx, @Args('data') data: UserUpdatePasswordInput): Promise<User> {
    const authenticatedUserId = Number(ctx.req.headers.authenticateduserid);
    const user = await this.userService.updatePassword(authenticatedUserId, data);

    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: number): Promise<true> {
    await this.userService.delete(id);

    return true;
  }
}
