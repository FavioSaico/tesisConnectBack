import { AuthResponseDto } from "../dtos/auth/auth-response.dto";

export abstract class SearchDatasource{

  abstract search(term: string):Promise<AuthResponseDto[]>
}