import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsISO8601,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseDto {
  @ApiProperty({ example: 'Conta de luz' })
  @IsString()
  @IsNotEmpty({ message: 'O titulo é obrigatório.' })
  title: string;

  @ApiProperty({ example: 150.75 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: '2025-04-01' })
  @IsISO8601({}, { message: 'A data deve esta no formato (dia-mes-ano).' })
  date: string;

  @ApiProperty({ example: 'Moradia' })
  @IsString()
  @IsNotEmpty({ message: 'A categoria é obrigatória.' })
  category: string;

  @ApiProperty({ example: 'Referente ao mês de abril', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  userId: number;
}
