import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class SaveInvitationDto {
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly message: string;

  // Agrega otros campos según sea necesario
}
