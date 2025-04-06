import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';

@ApiTags('Expenses')
@Controller('expenses') // Define a roda base: /expenses
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @ApiBody({ type: CreateExpenseDto })
  @ApiResponse({ status: 201, description: 'Despesa criada com sucesso.' })
  create(@Body() dto: CreateExpenseDto) {
    return this.expensesService.create(dto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de despesas retornada com sucesso.',
  })
  findAll() {
    return this.expensesService.findAll();
  }
}
