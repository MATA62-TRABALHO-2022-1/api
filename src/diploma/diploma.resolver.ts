import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';

import { Diploma } from './diploma.entity';
import { DiplomaService } from './diploma.service';
import { DiplomaCreateInput } from './dto/create-diploma.input';
import { DiplomaUpdateInput } from './dto/update-diploma.input';

@Resolver('Diploma')
export class DiplomaResolver {
    constructor(private diplomaService: DiplomaService) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => [ Diploma ])
    async findAllDiplomas(): Promise<Diploma[]> {
        const diplomas = await this.diplomaService.findAll();

        return diplomas;
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => Diploma)
    async findDiplomaById(@Args('id') id: number): Promise<Diploma> {
        const diploma = await this.diplomaService.findById(id);

        return diploma;
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Diploma)
    async createDiploma(@Args('data') data: DiplomaCreateInput): Promise<Diploma> {
        const diploma = await this.diplomaService.create(data);

        return diploma;
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Diploma)
    async updateDiploma(@Args('data') data: DiplomaUpdateInput): Promise<Diploma> {
        const diploma = await this.diplomaService.update(data);

        return diploma;
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    async deleteDiploma(@Args('id') id: number): Promise<true> {
        await this.diplomaService.delete(id);

        return true;
    }
  
}
