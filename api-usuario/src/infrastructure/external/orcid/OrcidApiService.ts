import axios from 'axios';
import { OrcidRepository } from '../../../domain/repositories/orcidRepository';
import { OrcidUser } from '../../../domain/entities/orcid-info';

export class OrcidApiService implements OrcidRepository {
  async getById(orcid: string): Promise<OrcidUser> {
    const url = `https://pub.orcid.org/v3.0/${orcid}/record`;

    const response = await axios.get(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    const data = response.data;

    const nombre = data?.person?.name?.['given-names']?.value ?? '';
    const apellido = data?.person?.name?.['family-name']?.value ?? '';

    return new OrcidUser(orcid, nombre, apellido, data);
  }
}