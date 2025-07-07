import { AuthResponseDto } from "../../../domain/dtos/auth/auth-response.dto";
import { SearchRepository } from "../../../domain/repositories/searcher.repository";

interface Search {
    execute( term: string ): Promise<AuthResponseDto[]>;
}

export class SearchUseCase implements Search {

    constructor(
        private readonly searchRepository: SearchRepository,
    ){}

    // implementamos el método
    async execute( term: string ): Promise<AuthResponseDto[]> {
        
        const users = await this.searchRepository.search(term);
    
        return users;
    }
}