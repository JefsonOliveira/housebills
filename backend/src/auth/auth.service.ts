import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (userExists) {
      throw new ConflictException('E-mail já cadastrado.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    return { message: 'Usuário cadastrado com sucesso!', userId: user.id };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'Login realizado com sucesso!',
      accessToken,
    };
  }
}

// async login(email: string, password: string) {
//   const user = await this.prisma.user.findUnique({ where: { email } });

//   if (!user) {
//     throw new UnauthorizedException('Credenciais inválidas.');
//   }

//   const passwordMatch = await bcrypt.compare(password, user.password);

//   if (!passwordMatch) {
//     throw new UnauthorizedException('Credenciais inválidas.');
//   }

//   return { message: 'Login realizado com sucesso!', userId: user.id };
// }
