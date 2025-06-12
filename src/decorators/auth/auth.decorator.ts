
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';

export function Auth(mode: string) {
  return applyDecorators(
    SetMetadata('mode', mode),
    UseGuards(AuthGuard),
  );
}