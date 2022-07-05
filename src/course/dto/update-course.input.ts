import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CourseUpdateInput {
    @Field()
    @IsNumber()
    @IsNotEmpty({ message: 'ID cannot be empty.' })
        id: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Name cannot be empty.' })
        name?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Degree cannot be empty.' })
        degree?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'eMec Code cannot be empty.' })
        eMecCode?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'DOU Authorization cannot be empty.' })
        douAuthorization?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'DOU Recognition cannot be empty.' })
        douRecognition?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'DOU Renovation cannot be empty.' })
        douRenovation?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Observation cannot be empty.' })
        observation?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsNumber()
    @IsNotEmpty({ message: 'Instituition ID cannot be empty.' })
        partnerInstituitionId?: number;
}
