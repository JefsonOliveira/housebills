import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ExpensesModule } from './expenses/expenses.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // permite acesso em qualquer módulo
    }),
    AuthModule,
    ExpensesModule,
    UsersModule,
  ],
})
export class AppModule {}
