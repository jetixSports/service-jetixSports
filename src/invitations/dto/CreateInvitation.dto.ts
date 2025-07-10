import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsArray,
  IsOptional,
} from "class-validator";

export enum InvitationStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  DENIED = "denied",
}

export class CreateInvitationDto {
  @ApiProperty({
    description: "ID del equipo al que se invita",
    example: "507f1f77bcf86cd799439011",
  })
  @IsNotEmpty()
  @IsString()
  teamId: string;

  @ApiProperty({
    description: "ID del usuario invitado",
    example: "507f1f77bcf86cd799439012",
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    description: "ID del usuario que realiza la invitación",
    example: "507f1f77bcf86cd799439013",
  })
  @IsNotEmpty()
  @IsString()
  invitorId: string;

  @ApiPropertyOptional({
    description: "Estado de la invitación",
    enum: InvitationStatus,
    default: InvitationStatus.PENDING,
    example: InvitationStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(InvitationStatus, {
    message: "Status must be one of: pending, accepted, denied",
  })
  status?: InvitationStatus;
}
