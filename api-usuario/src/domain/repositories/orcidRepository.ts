import { OrcidUser } from '../entities/orcid-info';

export interface OrcidRepository {
  getById(orcid: string): Promise<OrcidUser>;
}