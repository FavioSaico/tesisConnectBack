import { GradoAcademico } from "../../../infrastructure/database/mysql";
import { CarreraProfesional } from "../../../infrastructure/database/mysql";



// los dtos pueden ser clases, funciones o factory functions
export class AuthResponseDto {

  constructor(
    public id: number,
    public nombres: string,
    public apellidos: string,
    public correo: string,
    public descripcion: string,
    public rol_tesista: boolean,
    public rol_asesor: boolean,
    public orcid: string,
    public linea_investigacion: string,
    public grado_academico: GradoAcademico,
    public carrera_profesional: CarreraProfesional,
    public readonly especialidades: {
      idEspecialidad: number;
      nombreEspecialidad: string; 
      aniosExperiencia: number;
    }[],
    public readonly publicaciones: {
      titulo: string;
      baseDatosBibliografica: string;
      revista: string;
      anioPublicacion: number;
      urlPublicacion: string;
    }[]
  ) { }
}