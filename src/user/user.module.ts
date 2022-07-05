import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PrismaService } from '../../prisma/service.prisma';

@Module({
    providers: [ PrismaService, UserResolver, UserService ],
    exports: [UserService]
})
export class UserModule {};
