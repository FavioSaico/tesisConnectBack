import { CustomError, RegisterUserDto, AuthDatasource } from '../../domain';
import { BcryptAdapter } from '../../config';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';
import { AppDataSource, Usuario } from '../database/mysql';
import { AuthResponseDto } from '../../domain/dtos/auth/auth-response.dto';
import { EspecialidadUsuario } from '../database/mysql/models/EspecialidadUsuario.entity';
import { Publicacion } from '../database/mysql/models/Publicacion.entity';
import { PublicacionUsuario } from '../database/mysql/models/PublicacionUsuario.entity';
import { In } from 'typeorm';

// IMPLEMENTACION CON MYSQL

// creamos los tipos
type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;
export class AuthDatasourceImpl implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
        private usuarioRepository = AppDataSource.getRepository(Usuario),
        private especialidadUsuarioRepository = AppDataSource.getRepository(EspecialidadUsuario),
        private publicacionRepository = AppDataSource.getRepository(Publicacion),
        private publicacionUsuarioRepository = AppDataSource.getRepository(PublicacionUsuario)
    ) {

    }

    // recibe un RegisterUserDto y retorna un UserEntity
    async register(registerUserDto: RegisterUserDto): Promise<AuthResponseDto> {
        const { correo, contrasena, ...data } = registerUserDto;

        try {
            const exists = await this.usuarioRepository.findOneBy({ correo });
            if (exists) throw CustomError.badRequest('Correo ya se encuentra registrado');

            const usuario = await this.usuarioRepository.save({
                ...data,
                correo,
                contrasena: this.hashPassword(contrasena)
            });

            if (registerUserDto.especialidades?.length > 0) {
                const especialidades = registerUserDto.especialidades.map((esp) =>
                    this.especialidadUsuarioRepository.create({
                        id_usuario: usuario.id,
                        id_especialidad: esp.idEspecialidad,
                        anios_experiencia: esp.aniosExperiencia
                    })
                );
                await this.especialidadUsuarioRepository.save(especialidades);
            }

            if (registerUserDto.publicaciones?.length > 0) {
                for (const pub of registerUserDto.publicaciones) {
                    const publicacion = await this.publicacionRepository.save({
                        titulo: pub.titulo,
                        base_datos_bibliografica: pub.baseDatosBibliografica,
                        revista: pub.revista,
                        anio_publicacion: pub.anioPublicacion,
                        url_publicacion: pub.urlPublicacion
                    });

                    await this.publicacionUsuarioRepository.save({
                        id_usuario: usuario.id,
                        id_publicacion: publicacion.id
                    });
                }
            }

            const usuarioRegistrado = await this.usuarioRepository.findOneBy({ correo: correo });

            const especialidades = usuarioRegistrado.especialidades_usuario.map(eu => ({
                idEspecialidad: eu.id_especialidad,
                nombreEspecialidad: eu.especialidad?.nombre ?? '',
                aniosExperiencia: eu.anios_experiencia
            }));

            const publicaciones = usuarioRegistrado.publicacionUsuario.map(pu => ({
                titulo: pu.publicacion.titulo,
                baseDatosBibliografica: pu.publicacion.base_datos_bibliografica,
                revista: pu.publicacion.revista,
                anioPublicacion: pu.publicacion.anio_publicacion,
                urlPublicacion: pu.publicacion.url_publicacion
            }));

            return new AuthResponseDto(
                usuario.id,
                usuario.nombres,
                usuario.apellidos,
                usuario.correo,
                usuario.descripcion,
                usuario.rol_tesista,
                usuario.rol_asesor,
                usuario.orcid,
                usuario.linea_investigacion,
                usuarioRegistrado.grado_academico,
                usuarioRegistrado.carrera_profesional,
                usuarioRegistrado.Universidad,
                especialidades,
                publicaciones
            );

        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        }
    }

    async login(loginUserDto: LoginUserDto): Promise<AuthResponseDto> {
        const { correo, contrasena } = loginUserDto;

        try {
            const usuario = await this.usuarioRepository.findOneBy({ correo });

            if (!usuario) throw CustomError.badRequest('Correo no registrado');

            if (!this.comparePassword(contrasena, usuario.contrasena)) {
                throw CustomError.badRequest('Correo o contraseña incorrectos');
            }

            const especialidades = usuario.especialidades_usuario.map(eu => ({
                idEspecialidad: eu.id_especialidad,
                nombreEspecialidad: eu.especialidad?.nombre ?? '',
                aniosExperiencia: eu.anios_experiencia
            }));

            const publicaciones = usuario.publicacionUsuario.map(pu => ({
                titulo: pu.publicacion.titulo,
                baseDatosBibliografica: pu.publicacion.base_datos_bibliografica,
                revista: pu.publicacion.revista,
                anioPublicacion: pu.publicacion.anio_publicacion,
                urlPublicacion: pu.publicacion.url_publicacion
            }));

            return new AuthResponseDto(
                usuario.id,
                usuario.nombres,
                usuario.apellidos,
                usuario.correo,
                usuario.descripcion,
                usuario.rol_tesista,
                usuario.rol_asesor,
                usuario.orcid,
                usuario.linea_investigacion,
                usuario.grado_academico,
                usuario.carrera_profesional,
                usuario.Universidad,
                especialidades,
                publicaciones
            );

        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        }
    }

    async conseguirInformacionPorID(id: number): Promise<AuthResponseDto> {
        try {
            // 1. Buscar el usuario por ID
            const usuario = await this.usuarioRepository.findOne({
                where: { id }
            });

            if (!usuario) throw CustomError.badRequest('Usuario no encontrado');

            const especialidades = usuario.especialidades_usuario.map(eu => ({
                idEspecialidad: eu.id_especialidad,
                nombreEspecialidad: eu.especialidad?.nombre ?? '',
                aniosExperiencia: eu.anios_experiencia
            }));

            const publicaciones = usuario.publicacionUsuario.map(pu => ({
                titulo: pu.publicacion.titulo,
                baseDatosBibliografica: pu.publicacion.base_datos_bibliografica,
                revista: pu.publicacion.revista,
                anioPublicacion: pu.publicacion.anio_publicacion,
                urlPublicacion: pu.publicacion.url_publicacion
            }));

            // 4. Retornar la respuesta con la información del usuario
            return new AuthResponseDto(
                usuario.id,
                usuario.nombres,
                usuario.apellidos,
                usuario.correo,
                usuario.descripcion,
                usuario.rol_tesista,
                usuario.rol_asesor,
                usuario.orcid,
                usuario.linea_investigacion,
                usuario.grado_academico,
                usuario.carrera_profesional,
                usuario.Universidad,
                especialidades,
                publicaciones
            );
        } catch (error) {
            
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        }
    }

    async usuariosPorIds(ids: number[]): Promise<AuthResponseDto[]> {
        try {

            const usuarios = await this.usuarioRepository.find({
                where: {
                    id: In(ids)
                }
            });

            if (!usuarios) throw CustomError.badRequest('Usuario no encontrado');
            
            const usuariosResponse: AuthResponseDto[] = usuarios.map(user => ({
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
