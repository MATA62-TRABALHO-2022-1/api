import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CourseCreateInput {
    @Field()
    @IsString()
    @IsNotEmpty({ message: 'Name cannot be empty.' })
        name: string;

    @Field()
    @IsString()
    @IsNotEmpty({ message: 'Degree cannot be empty.' })
        degree: string;

    @Field()
    @IsString()
    @IsNotEmpty({ message: 'eMec Code cannot be empty.' })
        eMecCode: string;

    @Field()
    @IsString()
    @IsNotEmpty({ message: 'DOU Authorization cannot be empty.' })
        douAuthorization: string;

    @Field()
    @IsString()
    @IsNotEmpty({ message: 'DOU Recognition cannot be empty.' })
        douRecognition: string;

    @Field()
    @IsString()
    @IsNotEmpty({ message: 'DOU Renovation cannot be empty.' })
        douRenovation: string;

    @Field()
    @IsString()
    @IsNotEmpty({ message: 'Observation cannot be empty.' })
        observation: string;

    @Field()
    @IsNumber()
    @IsNotEmpty({ message: 'Instituition ID cannot be empty.' })
        partnerInstituitionId: number;
}
