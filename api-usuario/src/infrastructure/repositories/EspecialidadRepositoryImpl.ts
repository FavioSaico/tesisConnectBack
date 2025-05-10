import { EspecialidadDatasource } from '../../domain/datasources/EspecialidadDatasource';
import { EspecialidadRepository } from '../../domain/repositories/EspecialidadRepository';

export class EspecialidadRepositoryImpl implements EspecialidadRepository {
  constructor(private readonly datasource: EspecialidadDatasource) {}

  obtenerEspecialidades(): Promise<{ id: number; nombre: string }[]> {
    return this.datasource.obtenerEspecialidades();
  }
}