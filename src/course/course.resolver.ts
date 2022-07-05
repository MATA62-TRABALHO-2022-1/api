import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';

import { Course } from './course.entity';
import { CourseService } from './course.service';
import { CourseCreateInput } from './dto/create-course.input';
import { CourseUpdateInput } from './dto/update-course.input';

@Resolver('Course')
export class CourseResolver {
    constructor(private courseService: CourseService) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => [ Course ])
    async findAllCourses(): Promise<Course[]> {
        const courses = await this.courseService.findAll();

        return courses;
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => Course)
    async findCourseById(@Args('id') id: number): Promise<Course> {
        const course = await this.courseService.findById(id);

        return course;
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Course)
    async createCourse(@Args('data') data: CourseCreateInput): Promise<Course> {
        const course = await this.courseService.create(data);

        return course;
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Course)
    async updateCourse(@Args('data') data: CourseUpdateInput): Promise<Course> {
        const course = await this.courseService.update(data);

        return course;
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    async deleteCourse(@Args('id') id: number): Promise<true> {
        await this.courseService.delete(id);

        return true;
    }
  
}
