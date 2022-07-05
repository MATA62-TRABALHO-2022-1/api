import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

import { Roles } from 'src/auth/decorators/roles.decorators';
import { Course } from './course.entity';
import { CourseService } from './course.service';
import { CourseCreateInput } from './dto/create-course.input';
import { CourseUpdateInput } from './dto/update-course.input';

@Resolver('Course')
export class CourseResolver {
    constructor(private courseService: CourseService) {}

    @Roles('FUNCIONARIO_INST_PARCEIRA')
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Query(() => [ Course ])
    async findAllCourses(): Promise<Course[]> {
        const courses = await this.courseService.findAll();

        return courses;
    }

    @Roles('FUNCIONARIO_INST_PARCEIRA')
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Query(() => Course)
    async findCourseById(@Args('id') id: number): Promise<Course> {
        const course = await this.courseService.findById(id);

        return course;
    }

    @Roles('FUNCIONARIO_INST_PARCEIRA')
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Mutation(() => Course)
    async createCourse(@Args('data') data: CourseCreateInput): Promise<Course> {
        const course = await this.courseService.create(data);

        return course;
    }

    @Roles('FUNCIONARIO_INST_PARCEIRA')
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Mutation(() => Course)
    async updateCourse(@Args('data') data: CourseUpdateInput): Promise<Course> {
        const course = await this.courseService.update(data);

        return course;
    }

    @Roles('FUNCIONARIO_INST_PARCEIRA')
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Mutation(() => Boolean)
    async deleteCourse(@Args('id') id: number): Promise<true> {
        await this.courseService.delete(id);

        return true;
    }
  
}
