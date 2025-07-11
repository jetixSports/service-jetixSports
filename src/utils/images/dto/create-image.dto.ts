import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";

enum typeImages {
    "profile" = "profile",
    "tournaments" = "tournaments",
    "pay" = "pay",
    "default" = "default"
}
export class CreateImageDto {
    @ApiProperty({
        description: 'Tipo de imagen a subir',
        example: 'profile',
        enum: typeImages,
        enumName: 'ImageType',
        required: true
    })
    @IsString()
    @IsEnum(typeImages)
    type: string
}
