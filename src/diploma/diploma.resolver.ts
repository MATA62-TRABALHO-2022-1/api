import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

import { Roles } from 'src/auth/decorators/roles.decorators';
import { Diploma } from './diploma.entity';
import { DiplomaService } from './diploma.service';
import { DiplomaCreateInput } from './dto/create-diploma.input';
import { DiplomaUpdateInput } from './dto/update-diploma.input';

@Resolver('Diploma')
export class DiplomaResolver {
    constructor(private diplomaService: DiplomaService) {}

    @Roles('FUNCIONARIO_INST_PARCEIRA')
    @UseGuards(GqlAuthGuard)
    @Query(() => [ Diploma ])
    async findAllDiplomas(): Promise<Diploma[]> {
        const diplomas = await this.diplomaService.findAll();

        return diplomas;
    }

    @Roles('FUNCIONARIO_INST_PARCEIRA')
    @UseGuards(GqlAuthGuard)
    @Query(() => Diploma)
    async findDiplomaById(@Args('id') id: number): Promise<Diploma> {
        const diploma = await this.diplomaService.findById(id);

        return diploma;
    }

    @Roles('FUNCIONARIO_INST_PARCEIRA')
    @UseGuards(GqlAuthGuard)
    @Mutation(() => Diploma)
    async createDiploma(@Args('data') data: DiplomaCreateInput): Promise<Diploma> {
        const diploma = await this.diplomaService.create(data);

        return diploma;
    }

    @Roles('FUNCIONARIO_INST_PARCEIRA')
    @UseGuards(GqlAuthGuard)
    @Mutation(() => Diploma)
    async updateDiploma(@Args('data') data: DiplomaUpdateInput): Promise<Diploma> {
        const diploma = await this.diplomaService.update(data);

        return diploma;
    }

    @Roles('FUNCIONARIO_INST_VALIDADORA')
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Mutation(() => Diploma)
    async setIsDiplomaValidated(@Context() ctx, @Args('id') diplomaId: number): Promise<Diploma> {
        const instituitionId = Number(ctx.req.user.instituition.id);
        const diploma = await this.diplomaService.setIsDiplomaValidated(diplomaId, instituitionId);

        return diploma;
    }

    @Roles('FUNCIONARIO_INST_PARCEIRA')
    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    async deleteDiploma(@Args('id') id: number): Promise<true> {
        await this.diplomaService.delete(id);

        return true;
    }
  
}
