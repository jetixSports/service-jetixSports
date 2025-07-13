import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  IsEmail,
  IsEnum,
  IsIn,
  IsObject,
  isString,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

class mobile_payment {
  @IsString()
  @Transform(({ value }) => value.replaceAll(".", "").replaceAll(",", ""))
  identity: string;

  @IsString()
  @MaxLength(4)
  @MinLength(4)
  mobileCode: string;

  @IsString()
  @MaxLength(11)
  @MinLength(11)
  @Transform(({ value }) =>
    value.replaceAll("-", "").replaceAll("+58", "0").trim()
  )
  phoneNumber: string;
}

class bank_transfer {
  @IsString()
  @MaxLength(20)
  @MinLength(20)
  @Transform(({ value }) => value.trim())
  bankNumber: string;
}
class binance {
  @IsString()
  @IsEmail()
  email: string;
}

export class Details {
  @ApiPropertyOptional({
    description: "Dirección de correo electrónico para pago en binance",
    example: "usuario@ejemplo.com",
    type: String,
    format: "email",
  })
  @IsString()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description:
      "Número de cuenta bancaria (20 dígitos, se eliminarán espacios)",
    example: "12345678901234567890",
    type: String,
    minLength: 20,
    maxLength: 20,
    pattern: "^[0-9]{20}$",
  })
  @IsString()
  @MaxLength(20)
  @MinLength(20)
  @Transform(({ value }) => value?.replaceAll(" ", ""))
  bankNumber?: string;

  @ApiPropertyOptional({
    description:
      "Número de documento de identidad (se eliminarán puntos y comas)",
    example: "12345678",
    type: String,
  })
  @IsString()
  @Transform(({ value }) => value?.replaceAll(".", "")?.replaceAll(",", ""))
  identity?: string;

  @ApiPropertyOptional({
    description: "Código de verificación móvil (4 caracteres)",
    example: "1234",
    type: String,
    minLength: 4,
    maxLength: 4,
  })
  @IsString()
  @MaxLength(4)
  @MinLength(4)
  mobileCode?: string;

  @ApiPropertyOptional({
    description:
      "Número de teléfono (11 dígitos, se normalizará: elimina +58, espacios y guiones, reemplaza +58 con 0)",
    example: "04121234567",
    type: String,
    minLength: 11,
    maxLength: 11,
    pattern: "^[0-9]{11}$",
  })
  @IsString()
  @MaxLength(11)
  @MinLength(11)
  @Transform(({ value }) =>
    value?.replaceAll("-", "")?.replaceAll("+58", "0")?.replaceAll(" ", "")
  )
  phoneNumber?: string;
}
enum TypePay {
  "bank_transfer" = "bank_transfer",
  "binance" = "binance",
  "mobile_payment" = "mobile_payment",
}
export class CreatePaymentsDetailDto {
  @ApiProperty({
    description: "ID del usuario asociado al método de pago",
    example: "507f1f77bcf86cd799439011",
    required: true,
  })
  @IsString()
  _idUser: string;

  @ApiProperty({
    description: "Tipo de método de pago",
    enum: TypePay,
    example: "binance",
    required: true,
  })
  @IsString()
  @IsEnum(TypePay)
  typePay: string;

  @ApiProperty({
    description: "Detalles específicos del método de pago",
    type: Details,
    required: true,
  })
  @IsObject()
  @Type(() => Details)
  details: Details;
}
