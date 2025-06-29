import { IsEnum, IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

export enum InvitationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DENIED = 'denied',
}

export class CreateInvitationDto {
  @IsNotEmpty()
  @IsString()
  teamId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  invitorId: string;

  @IsOptional()
  @IsEnum(InvitationStatus, {
    message: 'Status must be one of: pending, accepted, denied',
  })
  status?: InvitationStatus;
}