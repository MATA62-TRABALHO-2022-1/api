import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/service.prisma';

import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {};

  public async findAll(): Promise<Role[]> {
    return await this.prismaService.role.findMany();
  }

}
