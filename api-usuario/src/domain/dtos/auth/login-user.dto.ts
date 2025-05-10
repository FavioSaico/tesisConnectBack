import { IsEmail, IsString, MinLength } from "class-validator";
export class LoginUserDto{

    @IsEmail({}, { message: 'Correo inválido' })
    correo: string;
    
    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener mínimo 6 caracteres.' })
    contrasena: string;

}
