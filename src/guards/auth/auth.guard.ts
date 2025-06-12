import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const mode = this.reflector.get<string>('mode', context.getHandler());
    const body = request.body;
    if (mode == 'NoAuth') {
      return true;
    }
    if (!body.token) {
      throw new ForbiddenException({
        message: 'Token was not sent',
        codeStatus: 400,
      });
    }

    return true;
  }
}
