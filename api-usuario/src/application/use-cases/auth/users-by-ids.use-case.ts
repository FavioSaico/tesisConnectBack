import { AuthRepository } from "../../../domain";
import { AuthResponseDto } from "../../../domain/dtos/auth/auth-response.dto";

interface UsersByIds {
    execute( ids: number[] ): Promise<AuthResponseDto[]>;
}

export class UsersByIdsUseCase implements UsersByIds {

    constructor(
        private readonly authRepository: AuthRepository,
    ){}

    // implementamos el método
    async execute( ids: number[] ): Promise<AuthResponseDto[]> {
        
        const users = await this.authRepository.usuariosPorIds(ids);
    
        return users;
    }
}