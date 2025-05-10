import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
  IsArray,
  ValidateNested,
  ArrayMinSize
} from 'class-validator';
import { Type } from 'class-transformer';

// 🔄 Mueve esta clase arriba
class EspecialidadDto {
  @IsNumber()
  @IsPositive({ message: 'ID de especialidad no válido.' })
  idEspecialidad: number;

  @IsNumber()
  @IsPositive({ message: 'Los años de experiencia deben ser positivos.' })
  aniosExperiencia: number;
}

// 🔄 También esta
class PublicacionDto {
  @IsString()
  @IsNotEmpty({ message: 'El título de la publicación es requerido.' })
  titulo: string;

  @IsString()
  @IsNotEmpty({ message: 'La base de datos bibliográfica es requerida.' })
  baseDatosBibliografica: string;

  @IsString()
  @IsNotEmpty({ message: 'La revista es requerida.' })
  revista: string;

  @IsNumber()
  @IsPositive({ message: 'El año de publicación debe ser positivo.' })
  anioPublicacion: number;

  @IsString()
  @IsNotEmpty({ message: 'La URL de la publicación es requerida.' })
  urlPublicacion: string;
}

export class RegisterUserDto {
  @IsNumber()
  @IsPositive({ message: 'Coloque un grado académico válido.' })
  id_grado_academico: number;

  @IsString()
  @IsNotEmpty({ message: 'El nombre completo es requerido.' })
  nombre_completo: string; // Modificado a nombre_completo

  @IsString()
  @IsNotEmpty({ message: 'El apellido completo es requerido.' })
  apellido_completo: string; // Modificado a apellido_completo

  @IsEmail({}, { message: 'Correo institucional inválido.' })
  correo_institucional: string; // Modificado a correo_institucional

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener mínimo 6 caracteres.' })
  contrasena: string; // Modificado a contrasena

  @IsString()
  @IsNotEmpty({ message: 'La descripción es requerida.' })
  descripcion: string;

  @IsString()
  @IsNotEmpty({ message: 'La línea de investigación es requerida.' })
  linea_investigacion: string; // Nuevo campo para la línea de investigación

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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EspecialidadDto)
  @IsOptional()
  especialidades?: EspecialidadDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PublicacionDto)
  @IsOptional()
  publicaciones?: PublicacionDto[];
}