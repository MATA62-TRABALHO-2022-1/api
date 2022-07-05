import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class DiplomaUpdateInput {
    @Field()
    @IsNumber()
    @IsNotEmpty({ message: 'ID cannot be empty.' })
        id: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Name cannot be empty.' })
        studentName?: string;

    @Field()
    @IsNumber()
    @IsNotEmpty({ message: 'courseID cannot be empty.' })
        courseId?: number;
}
