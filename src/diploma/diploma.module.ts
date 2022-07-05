import { Module } from '@nestjs/common';
import { DiplomaResolver } from './diploma.resolver';
import { DiplomaService } from './diploma.service';
import { PrismaService } from '../../prisma/service.prisma';

@Module({
    providers: [ PrismaService, DiplomaResolver, DiplomaService ]
})
export class DiplomaModule { }
