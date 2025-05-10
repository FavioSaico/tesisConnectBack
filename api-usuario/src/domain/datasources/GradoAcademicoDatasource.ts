export interface GradoAcademicoDatasource {
  obtenerGradosAcademicos(): Promise<{ id: number, nombre: string }[]>; // Asegúrate de que esté definido como un array de objetos con 'id' y 'nombre'
}