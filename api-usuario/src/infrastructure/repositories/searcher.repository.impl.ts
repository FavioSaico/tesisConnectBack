import { SearchDatasource } from "../../domain/datasources/searcher.datasource";
import { AuthResponseDto } from "../../domain/dtos/auth/auth-response.dto";


export class SearchRepositoryImpl implements SearchRepositoryImpl{

  constructor(
    private readonly searcher: SearchDatasource
  ){}

  async search(term: string):Promise<AuthResponseDto[]> {
    return this.searcher.search(term)
  }

}