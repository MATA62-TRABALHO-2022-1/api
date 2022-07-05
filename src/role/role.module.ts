import { Module } from '@nestjs/common';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';
import { PrismaService } from '../../prisma/service.prisma';

@Module({
    providers: [ PrismaService, RoleResolver, RoleService ]
})
export class RoleModule { }
