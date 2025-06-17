import {
  IsString,
  MaxLength,
  IsBoolean,
  IsObject,
} from "class-validator";

export class UpdatePermissionDto {
  @IsString()
  @MaxLength(50)
  code: string;

  @IsObject()
  update:{[key:string]:UpdatePermission}
}
class UpdatePermission{
    @IsBoolean()
    READ:boolean
    
    @IsBoolean()
    UPDATE:boolean
    
    @IsBoolean()
    CREATE:boolean

    @IsBoolean()
    DELETE:boolean
}