import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/service.prisma';

import { Course } from './course.entity';
import { CourseCreateInput } from './dto/create-course.input';
import { CourseUpdateInput } from './dto/update-course.input';

@Injectable()
export class CourseService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {};

  public async findAll(): Promise<Course[]> {
    return await this.prismaService.course.findMany();
  }

  public async findById(id: number): Promise<Course> {
    const course = await this.prismaService.course.findUnique({
      where: {
        id,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found.');
    }

    return course;
  }

  public async create(inputData: CourseCreateInput): Promise<Course> {
    const createdCourse = await this.prismaService.course.create({
      data: {
        ...inputData,
      }
    });

    if(!createdCourse) {
      throw new InternalServerErrorException('Course could not be created.');
    }

    return createdCourse;
  }

  public async update(inputData: CourseUpdateInput): Promise<Course> {
    const updatedCourse = await this.prismaService.course.update({
      where: {
        id: inputData.id,
      },
      data: {
        ...inputData,
      }
    });

    if(!updatedCourse) {
      throw new InternalServerErrorException('Course could not be updated.');
    }

    return updatedCourse;
  }

  public async delete(id: number): Promise<void> {
    await this.findById(id);
    const deletedCourse = await this.prismaService.course.delete({
      where: {
        id,
      }
    });

    if(!deletedCourse) {
      throw new InternalServerErrorException('Course could not be deleted.');
    }  
  }

}
