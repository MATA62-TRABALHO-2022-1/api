import 'reflect-metadata';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Course } from '../course/course.entity';
import { Instituition } from '../instituition/instituition.entity';

@ObjectType({ isAbstract: true })
export class Diploma {
  @Field((type) => Int)
  id: number;

  @Field()
  studentName: string;

  @Field()
  courseId: number;

  @Field((type) => Course, { nullable: true })
  course?: Course;

  @Field({ nullable: true })
  validationInstituitionId?: number;

  @Field((type) => Instituition, { nullable: true })
  validationInstituition?: Instituition;

  @Field({ defaultValue: false })
  isValidated?: boolean;

  @Field({ nullable: true })
  validatedAt?: Date;

  @Field()
  createdAt?: Date;
}