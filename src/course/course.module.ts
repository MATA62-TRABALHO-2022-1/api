import { Module } from '@nestjs/common';
import { CourseResolver } from './course.resolver';
import { CourseService } from './course.service';
import { PrismaService } from '../../prisma/service.prisma';

@Module({
    providers: [ PrismaService, CourseResolver, CourseService ]
})
export class CourseModule { }
