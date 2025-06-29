import { PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail } from 'class-validator';
import { CreateInvitationDto } from './CreateInvitation.dto';

export class FindInvitationDto extends PartialType(CreateInvitationDto) {

  @IsString()
  @IsOptional()
   _id?: string;

}
