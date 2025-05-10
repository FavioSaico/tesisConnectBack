import { EspecialidadRepository } from "../../../domain/repositories/EspecialidadRepository";

export class ObtenerEspecialidades {
  constructor(private readonly repository: EspecialidadRepository) {}

  execute(): Promise<{ id: number; nombre: string }[]> {
    return this.repository.obtenerEspecialidades();
  }
}