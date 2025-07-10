import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString, IsOptional, IsEmail } from "class-validator";
import { CreateInvitationDto } from "./CreateInvitation.dto";

export class FindInvitationDto extends PartialType(CreateInvitationDto) {
  @ApiProperty({
    description: "ID de la invitación",
    example: "507f1f77bcf86cd799439011",
  })
  @IsString()
  @IsOptional()
  _id?: string;
}
