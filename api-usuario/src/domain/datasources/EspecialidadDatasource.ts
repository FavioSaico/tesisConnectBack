export interface EspecialidadDatasource {
  obtenerEspecialidades(): Promise<{ id: number, nombre: string }[]>; // Asegúrate de que esté definido como un array de objetos con 'id' y 'nombre'
}