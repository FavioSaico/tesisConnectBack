import { EspecialidadDatasource } from '../../domain/datasources/EspecialidadDatasource';
import { GradoAcademicoDatasource } from '../../domain/datasources/GradoAcademicoDatasource';
import { EspecialidadRepository } from '../../domain/repositories/EspecialidadRepository';
import { GradoAcademicoRepository } from '../../domain/repositories/GradoAcademicoRepository';

export class GeneralRepositoryImpl implements EspecialidadRepository, GradoAcademicoRepository {
  
  constructor(
    private readonly especialidadDatasource: EspecialidadDatasource,
    private readonly gradoAcademicoDatasource: GradoAcademicoDatasource
  ) {}

  obtenerEspecialidades(): Promise<{ id: number; nombre: string }[]> {
    return this.especialidadDatasource.obtenerEspecialidades();
  }

  obtenerGradosAcademicos(): Promise<{ id: number; nombre: string }[]> {
    return this.gradoAcademicoDatasource.obtenerGradosAcademicos();
  }
}