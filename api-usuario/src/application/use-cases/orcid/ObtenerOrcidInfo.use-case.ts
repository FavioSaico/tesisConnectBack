import { OrcidRepository } from '../../../domain/repositories/orcidRepository';
import { OrcidUser } from '../../../domain/entities/orcid-info';

export class GetOrcidUser {
  constructor(private readonly repository: OrcidRepository) {}

  async execute(orcid: string): Promise<OrcidUser> {
    return this.repository.getById(orcid);
  }
}