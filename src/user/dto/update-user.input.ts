import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from '../user.entity';

@InputType()
export class UserUpdateInput {
    @Field()
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Email cannot be empty.' })
    email?: string;

    @Field()
    @IsString()
    @IsOptional()
    @IsNotEmpty({ message: 'Password cannot be empty.' })
    @MinLength(8, { message: 'Password must be longer than 8 characters.' })
    password?: string;
    
    @Field()
    @IsOptional()
    @IsEnum(UserRole)
    @IsNotEmpty({ message: 'User role cannot be empty.' })
    role?: UserRole;

    @Field()
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Phone number cannot be empty.' })
    phone?: string;
}
