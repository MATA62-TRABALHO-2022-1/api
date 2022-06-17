import 'reflect-metadata';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../user/user.entity';

@ObjectType({ isAbstract: true })
export class Role {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  routines: string;

  @Field((type) => [User], { nullable: true })
  users?: User[] | null;
}