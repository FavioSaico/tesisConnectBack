import { RequestAdviceDto } from "../../../domain";
import { RelationesRepository } from "../../../domain/repositories/relationes.repository";

interface SolicitarAsesoriaUseCase {
    execute( solicitarAsesoriaDto: RequestAdviceDto ): Promise<any>;
}

export class SolicitarAsesoria implements SolicitarAsesoriaUseCase {

    constructor(
        private readonly relacionesRepository: RelationesRepository,
    ){}

    // implementamos el método
    async execute( solicitarAsesoriaDto: RequestAdviceDto ): Promise<any> {

        await this.relacionesRepository.solicitarAsesoria(solicitarAsesoriaDto);
    
        return {
            messageSuccessful: "Solicitud enviada correctamente"
        };
    }
}