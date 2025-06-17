import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsService } from 'src/permissions/permissions.service';
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private readonly permissionService: PermissionsService
  ) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {

      const request = context.switchToHttp().getRequest();
      const accessCodes = this.reflector.get<string[]>('accessCodes', context.getHandler());
      const typePermission = this.reflector.get<string>('typePermission', context.getHandler());
      const userData = request.userData;
      if (!userData)
        throw new ForbiddenException('Token no válido anteriormente');
      const permissionsRes=await this.permissionService.verifyPermissions({
        code:accessCodes,
        role:userData?.role
      })
      const userPermissions=permissionsRes.data
      const isVerified=accessCodes.some(item=>userPermissions?.[item]?.[typePermission])
      if(!isVerified)
        throw new ForbiddenException( 'No posees los permisos necesarios');
      request.userPermissions=userPermissions
      return true;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
