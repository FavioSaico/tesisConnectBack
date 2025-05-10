export class DomainPublicacionUsuario {
  id?: number;
  id_usuario: number;
  id_publicacion: number;

  constructor(id_usuario: number, id_publicacion: number, id?: number) {
    this.id = id;
    this.id_usuario = id_usuario;
    this.id_publicacion = id_publicacion;
  }
}