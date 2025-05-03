import { OrcidUser } from "../../domain/entities/orcid-info";
import { OrcidRepository } from "../../domain/repositories/orcidRepository";
import { OrcidDatasource } from "../../domain/datasources/orcid.datasource";

export class OrcidRepositoryImpl implements OrcidRepository {
  constructor(private readonly datasource: OrcidDatasource) {}

  getById(orcid: string): Promise<OrcidUser> {
    return this.datasource.getUserById(orcid);
  }
}