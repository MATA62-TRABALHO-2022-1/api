import 'reflect-metadata'
import { ObjectType, Field, HideField, Int } from '@nestjs/graphql'

export enum UserRole {
  DIRIGENTE = 'dirigente',
  DIRETOR = 'diretor',
  FUNCIONARIO = 'funcionario',
  SUPERINTENDENTE = 'superintendente',
  COORDENADOR_CARE = 'coordenador_care',
}

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
  role: string | UserRole;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}