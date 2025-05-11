export class DomainUsuario{

  constructor(
      public id: number,
      public id_grado_academico: number,
      public id_carrera_profesional: number,
      public nombre: string,
      public apellido: string,
      public correo: string,
      public contrasenia: string,
      public descripcion: string,
      public rol_tesista: boolean,
      public rol_asesor: boolean,
      public rol_colaborador: boolean,
      public fecha_registro: Date,
      public fecha_actualizacion: Date,
      public orcid?: string,
      public cuenta_activa?:boolean,
  ){

  }

}