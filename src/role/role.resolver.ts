import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';

import { Role } from './role.entity';
import { RoleService } from './role.service';

@Resolver('Role')
export class RoleResolver {
    constructor(private roleService: RoleService) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => [ Role ])
    async findAllRoles(): Promise<Role[]> {
        const roles = await this.roleService.findAll();

        return roles;
    }
  
}
