export class OrcidWork {
  constructor(
    public readonly titulo: string,
    public readonly doi: string,
    public readonly urlPublicacion: string,
    public readonly añoPublicacion: string,
    public readonly base_datos: string,
    public readonly journal: string
  ) {}
}