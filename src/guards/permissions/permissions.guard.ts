import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private readonly jwtService: JwtService
  ) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {

    const request = context.switchToHttp().getRequest();
    const accessCodes = this.reflector.get<string>('accessCodes', context.getHandler());
    const userData = request.userData;
    console.log(userData,accessCodes);
    
      return true;
    } catch (error) {
      throw new ForbiddenException({
        message: 'Token inválido o expirado',
        codeStatus: 401,
      });
    }
  }
}
