import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener almenos de 8 caracteres' })
  @MaxLength(15, {
    message: 'La contraseña no debe tener mas de 15 caracteres',
  })
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\]{};':"\\|,.<>?]).*$/, {
    message: 'La contraseña debe tener al menos una mayúscula y un símbolo',
  })
  password: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9._%+-]{8,15}@/, {
    message: 'El correo electrónico debe tener entre 8 y 15 caracteres',
  })
  @Matches(/@(gmail|outlook|hotmail|yahoo)\.com$/, {
    message: 'El correo electrónico no cumple con el formato',
  })
  email: string;
  
}
