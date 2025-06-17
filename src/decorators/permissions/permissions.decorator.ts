
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { PermissionsGuard } from 'src/guards/permissions/permissions.guard';

export function Permissions(accessCodes: string[],typePermission:string) {
  return applyDecorators(
    SetMetadata('accessCodes', accessCodes),
    SetMetadata('typePermission', typePermission),
    UseGuards(PermissionsGuard),
  );
}