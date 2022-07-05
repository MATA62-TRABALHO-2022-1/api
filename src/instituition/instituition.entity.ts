import 'reflect-metadata';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../user/user.entity';
import { Course } from '../course/course.entity';
import { Diploma } from '../diploma/diploma.entity';

@ObjectType({ isAbstract: true })
export class Instituition {
    @Field((type) => Int)
        id: number;

    @Field()
        name: string;

    @Field()
        address: string;

    @Field()
        city: string;

    @Field()
        state: string;

    @Field()
        keeper: string;

    @Field()
        mecCredibility: string;

    @Field()
        isPartner: boolean;

    @Field((type) => [ User ], { nullable: true })
        users?: User[] | null;

    @Field((type) => [ Course ], { nullable: true })
        courses?: Course[] | null;

    @Field((type) => [ Diploma ], { nullable: true })
        diplomas?: Diploma[] | null;
}