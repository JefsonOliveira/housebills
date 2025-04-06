import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateExpenseDto) {
    return this.prisma.expense.create({
      data: {
        ...data,
        date: new Date(data.date), // <-- converção
      },
    });
  }

  async findAll() {
    return this.prisma.expense.findMany();
  }
}
