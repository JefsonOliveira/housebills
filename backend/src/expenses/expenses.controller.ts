import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Expenses')
@UseGuards(JwtAuthGuard) // protege todas as rotas deste controller
@ApiBearerAuth()
@Controller('expenses') // Define a rota base: /expenses
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @ApiBody({ type: CreateExpenseDto })
  @ApiResponse({ status: 201, description: 'Despesa criada com sucesso.' })
  create(@Body() dto: CreateExpenseDto) {
    return this.expensesService.create(dto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Despesa retornada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Despesa não encontrada.',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.expensesService.findOne(id);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de despesas retornada com sucesso.',
  })
  findAll() {
    return this.expensesService.findAll();
  }

  @Patch(':id')
  @ApiBody({ type: CreateExpenseDto })
  @ApiResponse({ status: 200, description: 'Despesa atualizada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Despesa não encontrada.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateExpenseDto>,
  ) {
    return this.expensesService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Despesa removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Despesa não encontrada.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.expensesService.remove(id);
  }
}
