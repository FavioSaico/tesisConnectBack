import { OrcidWork } from './orcid-work';

export class OrcidUser {
  constructor(
    public readonly orcid: string,
    public readonly nombre: string,
    public readonly apellido: string,
    public readonly url_perfil: string,
    public readonly url_linkedin: string = null,
    public readonly publicaciones: OrcidWork[] = []
  ) {}
}
