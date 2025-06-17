
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { PermissionsGuard } from 'src/guards/permissions/permissions.guard';

export function Permissions(accessCodes: string[]) {
  return applyDecorators(
    SetMetadata('accessCodes', accessCodes),
    UseGuards(PermissionsGuard),
  );
}