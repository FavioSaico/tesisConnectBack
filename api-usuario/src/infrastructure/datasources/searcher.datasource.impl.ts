import { In } from "typeorm";
import { CustomError } from "../../domain";
import { SearchDatasource } from "../../domain/datasources/searcher.datasource";
import { AuthResponseDto } from "../../domain/dtos/auth/auth-response.dto";
import { AppDataSource, Usuario } from "../database/mysql";

export class SearchDatasourceImpl implements SearchDatasource {

  constructor(
    private usuarioRepository = AppDataSource.getRepository(Usuario),
  ) {

  }

  async search(term: string):Promise<AuthResponseDto[]> {
    try {
        
        const usuarios = await this.usuarioRepository
          .createQueryBuilder('user')
          .leftJoinAndSelect('user.Universidad', 'universidad')
          .leftJoinAndSelect('user.especialidades_usuario', 'especialidadU')
          .leftJoinAndSelect('especialidadU.especialidad', 'especialidad')
          .leftJoinAndSelect('user.carrera_profesional', 'carrera')
          .leftJoinAndSelect('user.grado_academico', 'grado')
          .where('LOWER(user.nombres) LIKE :search', { search: `%${term.toLowerCase()}%` })
          .orWhere('LOWER(user.apellidos) LIKE :search', { search: `%${term.toLowerCase()}%` })
          .orWhere('LOWER(user.descripcion) LIKE :search', { search: `%${term.toLowerCase()}%` })
          .orWhere('LOWER(user.linea_investigacion) LIKE :search', { search: `%${term.toLowerCase()}%` })
          .orWhere('LOWER(universidad.nombre) LIKE :search', { search: `%${term.toLowerCase()}%` })
          .orWhere('LOWER(especialidad.nombre) LIKE :search', { search: `%${term.toLowerCase()}%` })
          .orWhere('LOWER(carrera.nombre) LIKE :search', { search: `%${term.toLowerCase()}%` })
          .orWhere('LOWER(grado.nombre) LIKE :search', { search: `%${term.toLowerCase()}%` })
          .getMany();

        if (!usuarios) throw CustomError.badRequest('Usuarios no encontrados');

        const ids = usuarios.map(user => user.id)

        const usuariosCompletos = await this.usuarioRepository.find({
            where: {
                id: In(ids)
            }
        });
        
        const usuariosResponse: AuthResponseDto[] = usuariosCompletos.map(user => ({
            id: user.id,
            nombres: user.nombres,
            apellidos: user.apellidos,
            correo: user.correo,
            descripcion: user.descripcion,
            rol_tesista: user.rol_tesista,
            rol_asesor: user.rol_asesor,
            orcid: user.orcid ?? '',
            linea_investigacion: user.linea_investigacion,
            grado_academico: user.grado_academico,
            carrera_profesional: user.carrera_profesional,
            universidad: user.Universidad,
            especialidades: user.especialidades_usuario.map((es) => ({
                idEspecialidad: es.especialidad.id,
                nombreEspecialidad: es.especialidad.nombre, 
                aniosExperiencia: es.anios_experiencia
            })),
            publicaciones: user.publicacionUsuario.map((pu) => ({
                titulo: pu.publicacion.titulo,
                baseDatosBibliografica: pu.publicacion.base_datos_bibliografica,
                revista: pu.publicacion.revista,
                anioPublicacion: pu.publicacion.anio_publicacion,
                urlPublicacion: pu.publicacion.url_publicacion
            })),
        }))

        return usuariosResponse;

    } catch (error) {
        
        if (error instanceof CustomError) throw error;
        throw CustomError.internalServer();
    }
  }
}