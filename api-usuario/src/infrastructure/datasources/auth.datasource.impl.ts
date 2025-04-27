import { CustomError, RegisterUserDto, AuthDatasource } from '../../domain';
import { BcryptAdapter } from '../../config';
import { UserMapper } from '../mappers/user.mapper';
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
        const {name, email } = registerUserDto; // , password

        // realizamos la grabación en la base de datos
        try {
            // 1. Verificar si el correo existe
            const exists = await this.usuarioRepository.findOneBy({email:email});
            if(exists) throw CustomError.badRequest('Usuario ya existe');
            
            // 2. Encriptar la contraseña
            const usuario = await this.usuarioRepository.save({
                name: name,
                email: email,
                // password: this.hashPassword(password)
            });

            // 3. Mapear la respuesta a nuestra entidad 
            return UserMapper.userEntityFromObject(usuario);

        } catch (error) {
            if (error instanceof CustomError){
                throw error
            }
            throw CustomError.internalServer();
        }
    }

    async login (loginUserDto: LoginUserDto):Promise<AuthResponseDto>{

        const {email, password} = loginUserDto

        try {
            // 1. Verificar si el correo existe
            const user = await this.usuarioRepository.findOneBy({email:email});

            
            if(!user){
                throw CustomError.badRequest('Usuario no existe')
            };


            // 2. comparamos las contraseña
            // if(!this.comparePassword(password,user!.password)) throw CustomError.badRequest('The email and/or password are incorrect');
            
            // 3. Mapear la respuesta a nuestra entidad
            return UserMapper.userEntityFromObject(user!);

        } catch (error) {

            if (error instanceof CustomError){
                throw error
            }

            throw CustomError.internalServer();
        }

    }
}

