import { AuthRepository } from "../../domain";
import { OrcidRepository } from "../../domain/repositories/orcidRepository";
import { GeneralRepositoryImpl } from "../../infrastructure/repositories/general.repository.impl";

export interface GraphQLContext {
  authRepository: AuthRepository;
  generalRepository: GeneralRepositoryImpl;
  orcidRepository: OrcidRepository;
}
