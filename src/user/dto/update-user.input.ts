import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../user.entity';

@InputType()
export class UserUpdateInput {    
    @Field({ nullable: true })
    @IsOptional()
    @IsEnum(UserRole)
    @IsNotEmpty({ message: 'User role cannot be empty.' })
    role?: UserRole;

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
}
