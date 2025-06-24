import { IsEnum, IsString } from "class-validator";

enum typeImages {
    "profile" = "profile",
    "tournaments" = "tournaments",
    "pay" = "pay",
    "default" = "default"
}
export class CreateImageDto {
    @IsString()
    @IsEnum(typeImages)
    type: string
}
