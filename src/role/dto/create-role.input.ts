import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class RoleCreateInput {
    @Field()
    @IsString()
    @IsNotEmpty({ message: 'Name cannot be empty.' })
    name: string;

    @Field()
    @IsString()
    @IsNotEmpty({ message: 'Routines cannot be empty.' })
    routines: string;
}
