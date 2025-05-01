import { OrcidUser } from "../entities/orcid-info";

export interface OrcidDatasource {
  getUserById(orcid: string): Promise<OrcidUser>;
}