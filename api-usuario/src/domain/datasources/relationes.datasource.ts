import { RequestAdviceDto } from "../dtos/relations/request-advice.dto";


export abstract class RelationesDatasource {

  abstract solicitarAsesoria(solicitarAsesoriaDto: RequestAdviceDto):Promise<any>

}