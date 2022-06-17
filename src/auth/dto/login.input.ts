import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty.' })
  @MinLength(8)
  password: string;
}
