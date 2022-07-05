import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class DiplomaCreateInput {
    @Field()
    @IsString()
    @IsNotEmpty({ message: 'Student name cannot be empty.' })
        studentName: string;

    @Field()
    @IsNumber()
    @IsNotEmpty({ message: 'Course id cannot be empty.' })
        courseId: number;
}
