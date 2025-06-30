import { JwtAdapter } from "../../../config/jwt";
import { AuthResponseDto } from "../../../domain/dtos/auth/auth-response.dto";
import { RegisterUserDto } from "../../../domain/dtos/auth/register-user.dto";
import { CustomError } from "../../../domain/errors/custom.error";
import { AuthRepository } from "../../../domain/repositories/auth.repository";

// definimos este tipo de datos que retornará el caso de uso de registro
interface UserToken {
    token: string;
    usuario: AuthResponseDto
}

// tipo de dato para el método que genera el token
type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

// Esta interfaz rige como va a funcionar el caso de uso
interface RegisterUserUseCase {
    execute( registerUserDto: RegisterUserDto ): Promise<UserToken>;
}

// Creamos la clase para el caso de uso
export class RegisterUser implements RegisterUserUseCase {

    constructor(
        // inyectamos el repositorio y la función para crear el token
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken,
    ){}

    // implementamos el método
    async execute( registerUserDto: RegisterUserDto ): Promise<UserToken> {

        // Crear usuario
        const user = await this.authRepository.register(registerUserDto);
    
        // Token
        const token = await this.signToken({ id: user.id }, '5h');
        if ( !token ) throw CustomError.internalServer('Error generating token');
    
        return {
            token: token, // retornamos el token
            usuario: user
        };
    }
}