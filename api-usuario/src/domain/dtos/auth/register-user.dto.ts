import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, 
    IsPositive, IsString, MinLength 
} from 'class-validator';
export class RegisterUserDto{

    @IsNumber()
    @IsPositive({ message: 'Coloque un grado académico válido' })
    id_grado_academico: number;

    @IsString()
    @IsNotEmpty({ message: 'El nombre es requerido' })
    nombre: string;

    @IsString()
    @IsNotEmpty({ message: 'El apellido es requerido' })
    apellido: string;

    @IsEmail({}, { message: 'Correo inválido' })
    correo: string;

    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener mínimo 6 caracteres.' })
    contrasenia: string;

    @IsString()
    @IsNotEmpty({ message: 'La descripción es requerida.' })
    descripcion: string;

    @IsBoolean()
    @IsOptional()
    rol_tesista?: boolean;

    @IsBoolean()
    @IsOptional()
    rol_asesor?: boolean;

    @IsBoolean()
    @IsOptional()
    rol_colaborador?: boolean;

    @IsString()
    @IsOptional()
    orcid?: string;
}
