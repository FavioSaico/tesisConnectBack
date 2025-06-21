import { GeneralRepository } from "../../../domain/repositories/general.repository";

export class ObtenerUniversidades {
  constructor(private readonly repository: GeneralRepository) {}

  execute(): Promise<{ id: number; nombre: string }[]> {
    return this.repository.obtenerUniversidades();
  }
}