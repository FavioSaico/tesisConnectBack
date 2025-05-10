import { GradoAcademico } from '../../infrastructure/database/mysql/models/GradoAcademico.entity';
import { GradoAcademicoDatasource } from '../../domain/datasources/GradoAcademicoDatasource';
import { AppDataSource } from '../../infrastructure/database/mysql'; // Asegúrate de que esta es tu instancia de DataSource

export class GradoAcademicoDatasourceImpl implements GradoAcademicoDatasource {
  async obtenerGradosAcademicos(): Promise<{ id: number, nombre: string }[]> {
    const GradoAcademicoRepository = AppDataSource.getRepository(GradoAcademico);
    const gradosAcademicos = await GradoAcademicoRepository.find();
    
    // Devuelve un array de objetos con 'id' y 'nombre'
    return gradosAcademicos.map(e => ({ id: e.id, nombre: e.nombre })); 
    
  }
}