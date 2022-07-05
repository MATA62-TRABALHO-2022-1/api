import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

import { Roles } from 'src/auth/decorators/roles.decorators';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserCreateInput } from './dto/create-user.input';
import { UserUpdateInput } from './dto/update-user.input';
import { UserUpdatePasswordInput } from './dto/update-user-password.input';

@Resolver('User')
export class UserResolver {
    constructor(private userService: UserService) {}

    @Roles('DIRETOR_INST_PARCEIRA', 'SUPERINTENDENTE_INST_VALIDADORA')
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Query(() => [ User ])
    async findAllUsers(): Promise<User[]> {
        const users = await this.userService.findAll();

        return users;
    }

    @Roles('DIRETOR_INST_PARCEIRA', 'SUPERINTENDENTE_INST_VALIDADORA')
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Query(() => User)
    async findUserById(@Args('id') id: number): Promise<User> {
        const user = await this.userService.findById(id);

        return user;
    }

    @Roles('DIRETOR_INST_PARCEIRA', 'SUPERINTENDENTE_INST_VALIDADORA')
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Mutation(() => User)
    async createUser(@Args('data') data: UserCreateInput): Promise<User> {
        const user = await this.userService.create(data);

        return user;
    }

    @Roles('DIRETOR_INST_PARCEIRA', 'SUPERINTENDENTE_INST_VALIDADORA')
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Mutation(() => User)
    async updateUser(@Context() ctx, @Args('data') data: UserUpdateInput): Promise<User> {
        const authenticatedUserId = Number(ctx.req.user.id);
        const user = await this.userService.update(authenticatedUserId, data);

        return user;
    }

    @Roles('DIRETOR_INST_PARCEIRA', 'SUPERINTENDENTE_INST_VALIDADORA')
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Mutation(() => User)
    async updateUserPassword(@Context() ctx, @Args('data') data: UserUpdatePasswordInput): Promise<User> {
        const authenticatedUserId = Number(ctx.req.user.id);
        const user = await this.userService.updatePassword(authenticatedUserId, data);

        return user;
    }

    @Roles('DIRETOR_INST_PARCEIRA', 'SUPERINTENDENTE_INST_VALIDADORA')
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Mutation(() => Boolean)
    async deleteUser(@Args('id') id: number): Promise<true> {
        await this.userService.delete(id);

        return true;
    }
}
