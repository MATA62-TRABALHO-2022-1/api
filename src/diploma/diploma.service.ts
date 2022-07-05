import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/service.prisma';

import { Diploma } from './diploma.entity';
import { DiplomaCreateInput } from './dto/create-diploma.input';
import { DiplomaUpdateInput } from './dto/update-diploma.input';

@Injectable()
export class DiplomaService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {};

  public async findAll(): Promise<Diploma[]> {
    return await this.prismaService.diploma.findMany();
  }

  public async findById(id: number): Promise<Diploma> {
    const diploma = await this.prismaService.diploma.findUnique({
      where: {
        id,
      },
    });

    if (!diploma) {
      throw new NotFoundException('Diploma not found.');
    }

    return diploma;
  }

  public async create(inputData: DiplomaCreateInput): Promise<Diploma> {
    const createdDiploma = await this.prismaService.diploma.create({
      data: {
        ...inputData,
      }
    });

    if(!createdDiploma) {
      throw new InternalServerErrorException('Diploma could not be created.');
    }

    return createdDiploma;
  }

  public async update(inputData: DiplomaUpdateInput): Promise<Diploma> {
    const updatedDiploma = await this.prismaService.diploma.update({
      where: {
        id: inputData.id,
      },
      data: {
        ...inputData,
      }
    });

    if(!updatedDiploma) {
      throw new InternalServerErrorException('Diploma could not be updated.');
    }

    return updatedDiploma;
  }

  public async delete(id: number): Promise<void> {
    await this.findById(id);
    const deletedDiploma = await this.prismaService.diploma.delete({
      where: {
        id,
      }
    });

    if(!deletedDiploma) {
      throw new InternalServerErrorException('Diploma could not be deleted.');
    }  
  }

}
