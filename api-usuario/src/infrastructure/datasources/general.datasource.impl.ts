import { AppDataSource } from '../../infrastructure/database/mysql';
import { Especialidad } from '../../infrastructure/database/mysql/models/Especialidad.entity';
import { GradoAcademico } from '../../infrastructure/database/mysql/models/GradoAcademico.entity';
import { EspecialidadDatasource } from '../../domain/datasources/EspecialidadDatasource';
import { GradoAcademicoDatasource } from '../../domain/datasources/GradoAcademicoDatasource';

export class GeneralDatasourceImpl implements EspecialidadDatasource, GradoAcademicoDatasource {

  async obtenerEspecialidades(): Promise<{ id: number, nombre: string }[]> {
    const especialidadRepository = AppDataSource.getRepository(Especialidad);
    const especialidades = await especialidadRepository.find();
    return especialidades.map(e => ({ id: e.id, nombre: e.nombre }));
  }

  async obtenerGradosAcademicos(): Promise<{ id: number, nombre: string }[]> {
    const gradoAcademicoRepository = AppDataSource.getRepository(GradoAcademico);
    const grados = await gradoAcademicoRepository.find();
    return grados.map(g => ({ id: g.id, nombre: g.nombre }));
  }
}