import { CustomError, RegisterUserDto, AuthDatasource } from '../../domain';
import { BcryptAdapter } from '../../config';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';
import { AppDataSource, Usuario } from '../database/mysql';
import { AuthResponseDto } from '../../domain/dtos/auth/auth-response.dto';
import { EspecialidadUsuario } from '../database/mysql/models/EspecialidadUsuario.entity';
import { Publicacion } from '../database/mysql/models/Publicacion.entity';
import { PublicacionUsuario } from '../database/mysql/models/PublicacionUsuario.entity';

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
        const { correo_institucional, contrasena, ...data } = registerUserDto;

        try {
            // 1. Verificar si el correo existe
            const exists = await this.usuarioRepository.findOneBy({ correo_institucional: correo_institucional });
            if (exists) throw CustomError.badRequest('Usuario ya existe');

            // 2. Encriptar la contraseña
            const usuario = await this.usuarioRepository.save({
                ...data,
                correo_institucional,
                contrasenia: this.hashPassword(contrasena)
            });

            // 3. Guardar especialidades si las hay
            if (registerUserDto.especialidades && registerUserDto.especialidades.length > 0) {
                const especialidades = registerUserDto.especialidades.map((esp) =>
                    this.especialidadUsuarioRepository.create({
                        id_usuario: usuario.id,
                        id_especialidad: esp.idEspecialidad,
                        anios_experiencia: esp.aniosExperiencia
                    })
                );
                await this.especialidadUsuarioRepository.save(especialidades);
            }

            // 4. Guardar publicaciones si las hay
            if (registerUserDto.publicaciones && registerUserDto.publicaciones.length > 0) {
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

            const usuarioRegistrado = await this.usuarioRepository.findOneBy({ correo_institucional: correo_institucional });

            const especialidadesUsuario = await this.especialidadUsuarioRepository.findBy({ id_usuario: usuario.id }); // <-- corregido

            const especialidades = especialidadesUsuario.map(eu => ({
                idEspecialidad: eu.id_especialidad,
                aniosExperiencia: eu.anios_experiencia
            }));

            const publicacionesUsuario = await this.publicacionUsuarioRepository.find({
                where: { id_usuario: usuario.id },
                relations: ['publicacion']
            });

            const publicaciones = publicacionesUsuario.map(pu => ({
                titulo: pu.publicacion.titulo,
                baseDatosBibliografica: pu.publicacion.base_datos_bibliografica,
                revista: pu.publicacion.revista,
                anioPublicacion: pu.publicacion.anio_publicacion,
                urlPublicacion: pu.publicacion.url_publicacion
            }));

            return new AuthResponseDto(
                usuario.id,
                usuario.nombre,
                usuario.apellido,
                usuario.correo_institucional,
                usuario.descripcion,
                usuario.rol_tesista,
                usuario.rol_asesor,
                usuario.orcid,
                usuarioRegistrado.grado_academico,
                especialidades,
                publicaciones
            );

        } catch (error) {
            if (error instanceof CustomError) {
                throw error
            }
            throw CustomError.internalServer();
        }
    }

    async login(loginUserDto: LoginUserDto): Promise<AuthResponseDto> {

        const { correo, contrasenia } = loginUserDto;

        try {
            // 1. Verificar si el correo existe
            const usuario = await this.usuarioRepository.findOneBy({ correo_institucional: correo });

            if (!usuario) {
                throw CustomError.badRequest('Usuario no existe');
            }

            // 2. Comparar contraseña
            if (!this.comparePassword(contrasenia, usuario.contrasenia)) {
                throw CustomError.badRequest('Correo o contraseña incorrectos');
            }

            // 3. Obtener especialidades
            const especialidadesUsuario = await this.especialidadUsuarioRepository.findBy({ id_usuario: usuario.id });

            const especialidades = especialidadesUsuario.map(eu => ({
                idEspecialidad: eu.id_especialidad,
                aniosExperiencia: eu.anios_experiencia
            }));

            // 4. Obtener publicaciones
            const publicacionesUsuario = await this.publicacionUsuarioRepository.find({
                where: { id_usuario: usuario.id },
                relations: ['publicacion']
            });

            const publicaciones = publicacionesUsuario.map(pu => ({
                titulo: pu.publicacion.titulo,
                baseDatosBibliografica: pu.publicacion.base_datos_bibliografica,
                revista: pu.publicacion.revista,
                anioPublicacion: pu.publicacion.anio_publicacion,
                urlPublicacion: pu.publicacion.url_publicacion
            }));

            // 5. Retornar respuesta
            return new AuthResponseDto(
                usuario.id,
                usuario.nombre,
                usuario.apellido,
                usuario.correo,
                usuario.descripcion,
                usuario.rol_tesista,
                usuario.rol_asesor,
                usuario.orcid,
                usuario.grado_academico,
                especialidades,
                publicaciones
            );

        } catch (error) {

            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServer();
        }
    }
}
