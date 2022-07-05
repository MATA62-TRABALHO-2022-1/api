import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

import { Roles } from 'src/auth/decorators/roles.decorators';
import { Instituition } from './instituition.entity';
import { InstituitionService } from './instituition.service';
import { InstituitionCreateInput } from './dto/create-instituition.input';
import { InstituitionUpdateInput } from './dto/update-instituition.input';

@Resolver('Instituition')
export class InstituitionResolver {
    constructor(private instituitionService: InstituitionService) {}

    @Roles('SUPERINTENDENTE_INST_VALIDADORA')
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Query(() => [ Instituition ])
    async findAllInstituitions(): Promise<Instituition[]> {
        const instituitions = await this.instituitionService.findAll();

        return instituitions;
    }

    @Roles('SUPERINTENDENTE_INST_VALIDADORA')
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Query(() => Instituition)
    async findInstituitionById(@Args('id') id: number): Promise<Instituition> {
        const instituition = await this.instituitionService.findById(id);

        return instituition;
    }

    @Roles('DIRIGENTE_INST_PARCEIRA', 'DIRIGENTE_INST_VALIDADORA', 'SUPERINTENDENTE_INST_VALIDADORA')
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Mutation(() => Instituition)
    async createInstituition(@Args('data') data: InstituitionCreateInput): Promise<Instituition> {
        const instituition = await this.instituitionService.create(data);

        return instituition;
    }

    @Roles('DIRETOR_INST_PARCEIRA', 'SUPERINTENDENTE_INST_VALIDADORA')
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Mutation(() => Instituition)
    async updateInstituition(@Args('data') data: InstituitionUpdateInput): Promise<Instituition> {
        const instituition = await this.instituitionService.update(data);

        return instituition;
    }

    @Roles('DIRETOR_INST_PARCEIRA', 'SUPERINTENDENTE_INST_VALIDADORA')
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Mutation(() => Boolean)
    async deleteInstituition(@Args('id') id: number): Promise<true> {
        await this.instituitionService.delete(id);

        return true;
    }
  
}
