import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class RoleUpdateInput {
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
    @IsNotEmpty({ message: 'Routines cannot be empty.' })
    routines?: string;
}
