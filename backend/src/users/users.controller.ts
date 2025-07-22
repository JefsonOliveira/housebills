import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Lista de usuários.' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Usuário encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Usuário deletado com sucesso.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
