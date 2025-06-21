import { GeneralDatasource } from '../../domain/datasources/general.datasource';
import { GeneralRepository } from '../../domain/repositories/general.repository';

export class GeneralRepositoryImpl implements GeneralRepository {
  
  constructor(
    private readonly generalDatasource: GeneralDatasource
  ) {}

  obtenerEspecialidades(): Promise<{ id: number; nombre: string }[]> {
    return this.generalDatasource.obtenerEspecialidades();
  }

  obtenerGradosAcademicos(): Promise<{ id: number; nombre: string }[]> {
    return this.generalDatasource.obtenerGradosAcademicos();
  }

  obtenerUniversidades(): Promise<{ id: number; nombre: string; }[]> {
    return this.generalDatasource.obtenerUniversidades()
  }
  obtenerCarreraProfesional(): Promise<{ id: number; nombre: string; }[]> {
    return this.generalDatasource.obtenerCarreraProfesional()
  }
}