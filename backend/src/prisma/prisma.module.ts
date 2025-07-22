import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // torna o módulo acessivel globalmente
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
