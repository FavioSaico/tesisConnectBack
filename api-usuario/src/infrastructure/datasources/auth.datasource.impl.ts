import { CustomError, RegisterUserDto, AuthDatasource } from '../../domain';
import { BcryptAdapter } from '../../config';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';
import { AppDataSource, Usuario } from '../database/mysql';
import { AuthResponseDto } from '../../domain/dtos/auth/auth-response.dto';

// IMPLEMENTACION CON MYSQL

// creamos los tipos
type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;
export class AuthDatasourceImpl implements AuthDatasource{

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
        private usuarioRepository = AppDataSource.getRepository(Usuario)
    ){

    }

    // recibe un RegisterUserDto y retorna un UserEntity
    async register(registerUserDto: RegisterUserDto): Promise<AuthResponseDto> {
        const { correo, contrasenia, ...data } = registerUserDto;

        try {
            // 1. Verificar si el correo existe
            const exists = await this.usuarioRepository.findOneBy({correo:correo});
            if(exists) throw CustomError.badRequest('Usuario ya existe');
            
            // 2. Encriptar la contraseña
            const usuario = await this.usuarioRepository.save({
                ...data,
                correo,
                contrasenia: this.hashPassword(contrasenia)
            });

            return new AuthResponseDto(
                usuario.id,
                usuario.id_grado_academico,
                usuario.nombre,
                usuario.apellido,
                usuario.correo,
                usuario.descripcion,
                usuario.rol_tesista,
                usuario.rol_asesor,
                usuario.rol_colaborador,
                usuario.orcid
            );

        } catch (error) {
            if (error instanceof CustomError){
                throw error
            }
            throw CustomError.internalServer();
        }
    }

    async login (loginUserDto: LoginUserDto):Promise<AuthResponseDto>{

        const {correo, contrasenia} = loginUserDto

        try {
            // 1. Verificar si el correo existe
            const usuario = await this.usuarioRepository.findOneBy({correo:correo});

            
            if(!usuario){
                throw CustomError.badRequest('Usuario no existe')
            };


            // 2. comparamos las contraseña
            if(!this.comparePassword(contrasenia,usuario.contrasenia)) throw CustomError.badRequest('Correo o contraseña incorrectos');
            
            return new AuthResponseDto(
                usuario.id,
                usuario.id_grado_academico,
                usuario.nombre,
                usuario.apellido,
                usuario.correo,
                usuario.descripcion,
                usuario.rol_tesista,
                usuario.rol_asesor,
                usuario.rol_colaborador,
                usuario.orcid
            );

        } catch (error) {

            if (error instanceof CustomError){
                throw error
            }

            throw CustomError.internalServer();
        }

    }
}

