import { Especialidad } from '../../infrastructure/database/mysql/models/Especialidad.entity';
import { EspecialidadDatasource } from '../../domain/datasources/EspecialidadDatasource';
import { AppDataSource } from '../../infrastructure/database/mysql'; // Asegúrate de que esta es tu instancia de DataSource

export class EspecialidadDatasourceImpl implements EspecialidadDatasource {
  async obtenerEspecialidades(): Promise<{ id: number, nombre: string }[]> {
    const especialidadRepository = AppDataSource.getRepository(Especialidad);
    const especialidades = await especialidadRepository.find();
    
    // Devuelve un array de objetos con 'id' y 'nombre'
    return especialidades.map(e => ({ id: e.id, nombre: e.nombre }));
  }
}