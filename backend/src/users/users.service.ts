import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    return user;
  }

  async update(id: number, data: Partial<CreateUserDto>) {
    await this.findOne(id); // reaproveita validação
    return this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id); // valida se existe antes

    // Deleta todas as despesas relacionadas ao usuário
    await this.prisma.expense.deleteMany({
      where: { userId: id },
    });

    // aqui deleta o usuário
    return this.prisma.user.delete({ where: { id } });
  }
}
