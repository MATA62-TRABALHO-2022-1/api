import 'reflect-metadata';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Diploma } from '../diploma/diploma.entity';
import { Instituition } from '../instituition/instituition.entity';

@ObjectType({ isAbstract: true })
export class Course {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  degree: string;

  @Field()
  eMecCode: string;

  @Field()
  douAuthorization: string;

  @Field()
  douRecognition: string;

  @Field()
  douRenovation: string;

  @Field()
  observation: string;

  @Field()
  partnerInstituitionId: number;

  @Field((type) => Instituition, { nullable: true })
  instituition?: Instituition | null;

  @Field((type) => [Diploma], { nullable: true })
  diplomas?: Diploma[] | null;
}