import * as crypto from 'crypto';
import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/service.prisma'
import { User } from './user.entity';
import { UserCreateInput } from './dto/create-user.input';
import { UserUpdateInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {};

  public async findAllUsers(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  public async findUserById(id: number): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      }
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  public async createUser(inputData: UserCreateInput): Promise<User> {
    await this._checkUserAttributesIsUsedBySomeone(inputData.email, inputData.cpf, inputData.phone);

    const createdUser = await this.prismaService.user.create({
      data: {
        ...inputData,
        password: crypto.createHmac('sha256', inputData.password).digest('hex'),
      }
    });

    if(!createdUser) {
      throw new InternalServerErrorException('User could not be created.');
    }

    return createdUser;
  }

  public async updateUser(id: number, inputData: UserUpdateInput): Promise<User> {
    const updatedUser = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...inputData,
        password: crypto.createHmac('sha256', inputData.password).digest('hex'),
      }
    });

    if(!updatedUser) {
      throw new InternalServerErrorException('User could not be updated.');
    }

    return updatedUser;
  }

  public async deleteUser(id: number): Promise<void> {
    await this.findUserById(id);
    const deletedUser = await this.prismaService.user.delete({
      where: {
        id,
      }
    });

    if(!deletedUser) {
      throw new InternalServerErrorException('User could not be deleted.');
    }  
  }

  private async _checkUserAttributesIsUsedBySomeone(email: string, cpf: string, phone: string): Promise<void> {
    const emailFound = await this.prismaService.user.findUnique({
      where: {
        email,
      }
    });
    if(emailFound) {
      throw new BadRequestException('This email is not available.');
    }

    const cpfFound = await this.prismaService.user.findUnique({
      where: {
        cpf,
      }
    });
    if(cpfFound) {
      throw new BadRequestException('This cpf is not available.');
    }

    const phoneFound = await this.prismaService.user.findUnique({
      where: {
        phone,
      }
    });
    if(phoneFound) {
      throw new BadRequestException('This phone number is not available.');
    }  
  }
}
