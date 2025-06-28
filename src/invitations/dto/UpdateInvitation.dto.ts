import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateInvitationDto {
  @IsString()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  readonly message?: string;

  // Agrega otros campos según sea necesario
}
