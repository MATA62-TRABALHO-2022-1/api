import { Module } from '@nestjs/common';
import { InstituitionResolver } from './instituition.resolver';
import { InstituitionService } from './instituition.service';
import { PrismaService } from '../../prisma/service.prisma';

@Module({
    providers: [ PrismaService, InstituitionResolver, InstituitionService ]
})
export class InstituitionModule { }
