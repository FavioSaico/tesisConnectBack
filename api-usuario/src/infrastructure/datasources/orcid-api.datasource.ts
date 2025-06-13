import axios from "axios";
import { OrcidDatasource } from "../../domain/datasources/orcid.datasource";
import { OrcidUser } from "../../domain/entities/orcid-info";
import { OrcidWork } from "../../domain/entities/orcid-work";

export class OrcidDatasourceImpl implements OrcidDatasource {
  async getUserById(orcid: string): Promise<OrcidUser> {
    const url = `https://pub.orcid.org/v3.0/${orcid}/record`;

    const response = await axios.get(url, {
      headers: { Accept: 'application/json' }
    });

    const data = response.data;
    
    //Nombres y Apellidos
    const nombre = data?.person?.name?.['given-names']?.value ?? '';
    const apellido = data?.person?.name?.['family-name']?.value ?? '';

    //URLS
    const url_perfil = data?.['orcid-identifier']?.uri ?? '';
    const researcherUrls = data?.person?.['researcher-urls']?.['researcher-url'] ?? [];
    const url_linkedin = researcherUrls.find((urlObj: any) =>
    urlObj?.url?.value?.toLowerCase().includes('linkedin')
    )?.url?.value ?? '';

    //Publicaciones
    const trabajos: OrcidWork[] = [];

    const grupos = data?.['activities-summary']?.works?.group ?? [];
    for (const group of grupos) {
      const resumenes = group['work-summary'] ?? [];

      for (const resumen of resumenes) {
        const titulo = resumen?.title?.title?.value ?? 'Sin título';

        // Busca el DOI
        const externalIds = resumen?.['external-ids']?.['external-id'] ?? [];
        const doiObj = externalIds.find((id: any) => id['external-id-type'] === 'doi');
        const doi = doiObj?.['external-id-value'] ?? '';

        // URL preferida (puede venir en resumen.url o en el DOI)
        const url = resumen?.url?.value ?? doiObj?.['external-id-url']?.value ?? '';

        // Fecha
        const fecha = resumen?.['publication-date']?.year?.value ?? '';

        // Base de Datos
        const base_datos =  resumen?.source?.['source-name']?.value ?? '';

        // Journal
        const journal =  resumen?.['journal-title']?.value ?? '';

        trabajos.push(new OrcidWork(titulo, doi, url, fecha, base_datos, journal));
      }
    }

    return new OrcidUser(orcid, nombre, apellido, url_perfil, url_linkedin, trabajos);
  }
}