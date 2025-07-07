import { AuthRepository } from "../../domain";
import { OrcidRepository } from "../../domain/repositories/orcidRepository";
import { SearchRepository } from "../../domain/repositories/searcher.repository";
import { GeneralRepositoryImpl } from "../../infrastructure/repositories/general.repository.impl";
import { Request, Response } from 'express';
export interface GraphQLContext {
  authRepository: AuthRepository;
  generalRepository: GeneralRepositoryImpl;
  orcidRepository: OrcidRepository;
  searchRepository: SearchRepository;
  req: Request;
  res: Response;
}
