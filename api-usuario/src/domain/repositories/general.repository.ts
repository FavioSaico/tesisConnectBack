export abstract class GeneralRepository {
  abstract obtenerEspecialidades(): Promise<{ id: number, nombre: string }[]>;
  abstract obtenerGradosAcademicos(): Promise<{ id: number, nombre: string }[]>;
  abstract obtenerUniversidades(): Promise<{ id: number, nombre: string }[]>;
  abstract obtenerCarreraProfesional(): Promise<{ id: number, nombre: string }[]>;
}