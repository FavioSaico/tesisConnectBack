import { GradoAcademicoDatasource } from '../../domain/datasources/GradoAcademicoDatasource';
import { GradoAcademicoRepository } from '../../domain/repositories/GradoAcademicoRepository';

export class GradoAcademicoRepositoryImpl implements GradoAcademicoRepository {
  constructor(private readonly datasource: GradoAcademicoDatasource) {}

  obtenerGradosAcademicos(): Promise<{ id: number; nombre: string }[]> {
    return this.datasource.obtenerGradosAcademicos();
  }
}