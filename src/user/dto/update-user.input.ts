import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class UserUpdateInput {    
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Email cannot be empty.' })
    email?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Phone number cannot be empty.' })
    phone?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsNumber()
    @IsNotEmpty({ message: 'User role cannot be empty.' })
    roleId?: number;
}
