import { GradoAcademico } from "../../../infrastructure/database/mysql";

// los dtos pueden ser clases, funciones o factory functions
export class AuthResponseDto{

    constructor(
      public id: number,
      public nombre: string,
      public apellido: string,
      public correo: string,
      public descripcion: string,
      public rol_tesista: boolean,
      public rol_asesor: boolean,
      public rol_colaborador: boolean,
      public orcid: string,
      public grado_academico: GradoAcademico
    ){
        
    }
}