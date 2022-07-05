import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';

import { Instituition } from './instituition.entity';
import { InstituitionService } from './instituition.service';
import { InstituitionCreateInput } from './dto/create-instituition.input';
import { InstituitionUpdateInput } from './dto/update-instituition.input';

@Resolver('Instituition')
export class InstituitionResolver {
  constructor(private instituitionService: InstituitionService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Instituition])
  async findAllInstituitions(): Promise<Instituition[]> {
    const instituitions = await this.instituitionService.findAll();

    return instituitions;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Instituition)
  async findInstituitionById(@Args('id') id: number): Promise<Instituition> {
    const instituition = await this.instituitionService.findById(id);

    return instituition;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Instituition)
  async createInstituition(@Args('data') data: InstituitionCreateInput): Promise<Instituition> {
    const instituition = await this.instituitionService.create(data);

    return instituition;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Instituition)
  async updateInstituition(@Args('data') data: InstituitionUpdateInput): Promise<Instituition> {
    const instituition = await this.instituitionService.update(data);

    return instituition;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteInstituition(@Args('id') id: number): Promise<true> {
    await this.instituitionService.delete(id);

    return true;
  }
  
}
