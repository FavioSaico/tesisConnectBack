import { AppDataSource, CarreraProfesional, Universidad } from '../../infrastructure/database/mysql';
import { Especialidad } from '../../infrastructure/database/mysql/models/Especialidad.entity';
import { GradoAcademico } from '../../infrastructure/database/mysql/models/GradoAcademico.entity';
import { GeneralDatasource } from '../../domain/datasources/general.datasource';

export class GeneralDatasourceImpl implements GeneralDatasource {

  constructor(
    private especialidadRepository = AppDataSource.getRepository(Especialidad),
    private gradoAcademicoRepository = AppDataSource.getRepository(GradoAcademico),
    private universidadRepository = AppDataSource.getRepository(Universidad),
    private carreraProfesionalRepository = AppDataSource.getRepository(CarreraProfesional)
  ) {

  }

  async obtenerEspecialidades(): Promise<{ id: number, nombre: string }[]> {
    const especialidades = await this.especialidadRepository.find();
    return especialidades.map(e => ({ id: e.id, nombre: e.nombre }));
  }

  async obtenerGradosAcademicos(): Promise<{ id: number, nombre: string }[]> {
    const grados = await this.gradoAcademicoRepository.find();
    return grados.map(g => ({ id: g.id, nombre: g.nombre }));
  }

  async obtenerUniversidades(): Promise<{ id: number; nombre: string; }[]> {
    const grados = await this.universidadRepository.find();
    return grados.map(g => ({ id: g.id, nombre: g.nombre }));
  }
  async obtenerCarreraProfesional(): Promise<{ id: number; nombre: string; }[]> {
    const grados = await this.carreraProfesionalRepository.find();
    return grados.map(g => ({ id: g.id, nombre: g.nombre }));
  }
}