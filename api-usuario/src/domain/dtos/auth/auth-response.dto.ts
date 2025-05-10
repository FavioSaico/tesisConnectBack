import { GradoAcademico } from "../../../infrastructure/database/mysql";


// los dtos pueden ser clases, funciones o factory functions
export class AuthResponseDto {

  constructor(
    public id: number,
    public nombre: string,
    public apellido: string,
    public correo: string,
    public descripcion: string,
    public rol_tesista: boolean,
    public rol_colaborador: boolean,
    public orcid: string,
    public grado_academico: GradoAcademico,
    public readonly especialidades: {
      idEspecialidad: number;
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