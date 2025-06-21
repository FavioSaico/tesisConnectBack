import { GeneralRepository } from "../../../domain/repositories/general.repository";

export class ObtenerCarreras {
  constructor(private readonly repository: GeneralRepository) {}

  execute(): Promise<{ id: number; nombre: string }[]> {
    return this.repository.obtenerCarreraProfesional();
  }
}