import { RequestAdviceDto } from "../../domain";
import { RelationesDatasource } from "../../domain/datasources/relationes.datasource";
import { RelationesRepository } from "../../domain/repositories/relationes.repository";


export class RelacionesRepositoryImpl implements RelationesRepository {

  constructor(private readonly relacionesDatasource: RelationesDatasource) {}

  solicitarAsesoria(solicitarAsesoriaDto: RequestAdviceDto): Promise<any> {
    return this.relacionesDatasource.solicitarAsesoria(solicitarAsesoriaDto);
  }

  
}