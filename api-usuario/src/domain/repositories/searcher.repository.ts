import { AuthResponseDto } from "../dtos/auth/auth-response.dto";

export abstract class SearchRepository{

  abstract search(term: string):Promise<AuthResponseDto[]>
}