import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  // Cria uma nova despesa
  async create(data: CreateExpenseDto) {
    return this.prisma.expense.create({
      data: {
        ...data,
        date: new Date(data.date), // <-- converção de string para Date
      },
    });
  }

  // Retorna todas as despesas
  async findAll() {
    return this.prisma.expense.findMany();
  }

  // Retorna uma despesa pelo ID
  async findOne(id: number) {
    const expense = await this.prisma.expense.findUnique({ where: { id } });
    if (!expense) {
      throw new NotFoundException(`Despesa com ID ${id} não encontrada.`);
    }
    return expense;
  }

  // Atualiza uma despesa parcialemte
  async update(id: number, data: Partial<CreateExpenseDto>) {
    const expense = await this.prisma.expense.findUnique({ where: { id } });
    if (!expense) {
      throw new NotFoundException(`Despesa com ID ${id} não encontrada.`);
    }

    return this.prisma.expense.update({
      where: { id },
      data: {
        ...data,
        date: data.date ? new Date(data.date) : undefined, // Atualiza a data de ela for enviada
      },
    });
  }

  async remove(id: number) {
    const expense = await this.findOne(id);
    return this.prisma.expense.delete({ where: { id: expense.id } });
  }
}
