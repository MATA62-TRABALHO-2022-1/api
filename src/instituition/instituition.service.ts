import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/service.prisma';

import { Instituition } from './instituition.entity';
import { InstituitionCreateInput } from './dto/create-instituition.input';
import { InstituitionUpdateInput } from './dto/update-instituition.input';

@Injectable()
export class InstituitionService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {};

  public async findAll(): Promise<Instituition[]> {
    return await this.prismaService.instituition.findMany();
  }

  public async findById(id: number): Promise<Instituition> {
    const instituition = await this.prismaService.instituition.findUnique({
      where: {
        id,
      },
    });

    if (!instituition) {
      throw new NotFoundException('Instituition not found.');
    }

    return instituition;
  }

  public async create(inputData: InstituitionCreateInput): Promise<Instituition> {
    const createdInstituition = await this.prismaService.instituition.create({
      data: {
        ...inputData,
      }
    });

    if(!createdInstituition) {
      throw new InternalServerErrorException('Instituition could not be created.');
    }

    return createdInstituition;
  }

  public async update(inputData: InstituitionUpdateInput): Promise<Instituition> {
    const updatedInstituition = await this.prismaService.instituition.update({
      where: {
        id: inputData.id,
      },
      data: {
        ...inputData,
      }
    });

    if(!updatedInstituition) {
      throw new InternalServerErrorException('Instituition could not be updated.');
    }

    return updatedInstituition;
  }

  public async delete(id: number): Promise<void> {
    await this.findById(id);
    const deletedInstituition = await this.prismaService.instituition.delete({
      where: {
        id,
      }
    });

    if(!deletedInstituition) {
      throw new InternalServerErrorException('Instituition could not be deleted.');
    }  
  }

}
