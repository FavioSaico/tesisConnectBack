import { RequestAdviceDto } from "../dtos/relations/request-advice.dto";

export abstract class RelationesRepository {
    
  abstract solicitarAsesoria(solicitarAsesoriaDto: RequestAdviceDto):Promise<any>

}