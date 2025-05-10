export interface GradoAcademicoRepository {
  obtenerGradosAcademicos(): Promise<{ id: number; nombre: string }[]>;
}