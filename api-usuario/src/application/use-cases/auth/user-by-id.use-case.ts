import { AuthRepository } from "../../../domain";
import { AuthResponseDto } from "../../../domain/dtos/auth/auth-response.dto";

interface UserById {
    execute( id: number ): Promise<AuthResponseDto>;
}

export class UserByIdUseCase implements UserById {

    constructor(
        // inyectamos el repositorio y la función para crear el token
        private readonly authRepository: AuthRepository,
    ){}

    // implementamos el método
    async execute( id: number ): Promise<AuthResponseDto> {
        
        // login usuario
        const user = await this.authRepository.conseguirInformacionPorID(id);
    
        return user;
    }
}