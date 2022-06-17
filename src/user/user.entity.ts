import 'reflect-metadata';
import { ObjectType, Field, HideField, Int } from '@nestjs/graphql';
import { Role } from '../role/role.entity';

@ObjectType({ isAbstract: true })
export class User {
  @Field((type) => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  cpf: string;

  @Field()
  phone: string;

  @Field()
  name: string;

  @HideField()
  password: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;

  @Field()
  roleId: number;

  @Field((type) => Role, { nullable: true })
  role?: Role | null;
}