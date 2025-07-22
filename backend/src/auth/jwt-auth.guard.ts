import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Guard que valida o JWT presente no header Authorization
// Usa a estratégia 'jwt' definida em JwtStrategy

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
