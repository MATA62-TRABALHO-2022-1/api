import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';

import { User } from './user.entity'
import { UserService } from './user.service';
import { UserCreateInput } from './dto/create-user.input';
import { UserUpdateInput } from './dto/update-user.input';
import { UserUpdatePasswordInput } from './dto/update-user-password.input';

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
    const user = await this.userService.getUserById(id);

    return user;
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: UserCreateInput): Promise<User> {
    const user = await this.userService.createUser(data);

    return user;
  }

  @Mutation(() => User)
  async updateUser(@Context() ctx, @Args('data') data: UserUpdateInput): Promise<User> {
    const authenticatedUserId = Number(ctx.req.headers.authenticateduserid);
    const user = await this.userService.updateUser(authenticatedUserId, data);

    return user;
  }

  @Mutation(() => User)
  async updateUserPassword(@Context() ctx, @Args('data') data: UserUpdatePasswordInput): Promise<User> {
    const authenticatedUserId = Number(ctx.req.headers.authenticateduserid);
    const user = await this.userService.updateUserPassword(authenticatedUserId, data);

    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: number): Promise<true> {
    await this.userService.deleteUser(id);

    return true;
  }
}
