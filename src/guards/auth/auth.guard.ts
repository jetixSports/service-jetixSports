import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private readonly jwtService: JwtService
  ) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const mode = this.reflector.get<string>('mode', context.getHandler());
    const token = request.headers['token-session'];
    if (mode == 'NoAuth') {
      return true;
    }
    if (!token) {
      throw new ForbiddenException( 'No se envio el Token');
    }
    try {
      const verifyToken = await this.jwtService.verify(token);
      if (!verifyToken) throw new ForbiddenException('Token expirado');
      const tokenData = await this.jwtService.decode(token);
      if(!tokenData?.email || !tokenData._id)
        throw new ForbiddenException('Token inválido');
      request.userData=tokenData
      return true;
    } catch (error) {
      throw new ForbiddenException('Token inválido o expirado');
    }
  }
}
