import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Transform, Type } from "class-transformer";

export class CreateCurrencyDto {
    @IsNotEmpty({ message: 'El nombre de la moneda es requerido' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @Length(2, 50, { message: 'El nombre debe tener entre 2 y 50 caracteres' })
    @Transform(({ value }) => value.replaceAll('.', '').replaceAll(',', ''))
    name: string;

    @IsNotEmpty({ message: 'El código de la moneda es requerido' })
    @IsString({ message: 'El código debe ser una cadena de texto' })
    @Length(1, 3, { message: 'El código debe tener entre 1 y 3 caracteres' })
    code: string;

    @IsNotEmpty({ message: 'El nombre corto de la moneda es requerido' })
    @IsString({ message: 'El nombre corto debe ser una cadena de texto' })
    @Length(1, 5, { message: 'El nombre corto debe tener entre 1 y 5 caracteres' })
    @Transform(({ value }) => value.replaceAll('.', '').replaceAll(',', ''))
    shortname: string;
}