export interface EspecialidadRepository {
  obtenerEspecialidades(): Promise<{ id: number; nombre: string }[]>;
}