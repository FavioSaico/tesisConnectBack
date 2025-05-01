import { Request, Response } from "express";
import { GetOrcidUserUseCase } from "../../application/use-cases/orcid/getorcidinfo-user.use-case";
import { OrcidRepository } from "../../domain/repositories/orcidRepository";

export class OrcidController {
  constructor(private readonly repository: OrcidRepository) {}

  public getUserById = async (req: Request, res: Response) => {
    try {
      const orcid = req.params.id;
      const useCase = new GetOrcidUserUseCase(this.repository);
      const user = await useCase.execute(orcid);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching ORCID data', error });
    }
  };
}