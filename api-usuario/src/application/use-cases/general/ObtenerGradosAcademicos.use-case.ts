import { GradoAcademicoRepository } from "../../../domain/repositories/GradoAcademicoRepository";

export class ObtenerGradosAcademicos {
  constructor(private readonly repository: GradoAcademicoRepository) {}

  execute(): Promise<{ id: number; nombre: string }[]> {
    return this.repository.obtenerGradosAcademicos();
  }
}