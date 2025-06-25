import { IsString, IsNotEmpty } from 'class-validator';

export class TeamIdDto {
  @IsString()
  @IsNotEmpty()
  _id: string;
}