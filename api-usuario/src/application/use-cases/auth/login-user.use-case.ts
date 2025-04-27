import { JwtAdapter } from "../../../config/jwt";
import { AuthResponseDto } from "../../../domain/dtos/auth/auth-response.dto";
import { LoginUserDto } from "../../../domain/dtos/auth/login-user.dto";
import { CustomError } from "../../../domain/errors/custom.error";
import { AuthRepository } from "../../../domain/repositories/auth.repository";

interface UserToken {
    token: string;
    usuario: AuthResponseDto
}

// tipo de dato
type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface LoginUserUseCase {
    execute( registerUserDto: LoginUserDto ): Promise<UserToken>;
}

export class LoginUser implements LoginUserUseCase {

    constructor(
        // inyectamos el repositorio y la función para crear el token
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken,
    ){}

    // implementamos el método
    async execute( loginUserDto: LoginUserDto ): Promise<UserToken> {
        
        // login usuario
        const user = await this.authRepository.login(loginUserDto);

        // Token
        const token = await this.signToken({ id: user.id }, '5h'); // generamos el token con el id
        if ( !token ) throw CustomError.internalServer('Error generando token');
    
        return {
            token: token, // retornamos el token
            usuario: user
        };
    }
}