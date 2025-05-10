export class DomainPublicacion {
  id?: number;
  titulo: string;
  base_datos_bibliografica: string;
  revista: string;
  anio_publicacion: number;
  url_publicacion: string;

  constructor(
    titulo: string,
    base_datos_bibliografica: string,
    revista: string,
    anio_publicacion: number,
    url_publicacion: string,
    id?: number
  ) {
    this.id = id;
    this.titulo = titulo;
    this.base_datos_bibliografica = base_datos_bibliografica;
    this.revista = revista;
    this.anio_publicacion = anio_publicacion;
    this.url_publicacion = url_publicacion;
  }
}