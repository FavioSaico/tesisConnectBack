import { AuthRepository } from "../../domain";

export interface GraphQLContext {
  authRepository: AuthRepository;
}
