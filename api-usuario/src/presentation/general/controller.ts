import { Request, Response } from "express"
import { CustomError } from "../../domain";
import { ObtenerEspecialidades } from "../../application/use-cases/general/ObtenerEspecialides.use-case";
import { ObtenerGradosAcademicos } from "../../application/use-cases/general/ObtenerGradosAcademicos.use-case";
import { GeneralRepository } from "../../domain/repositories/general.repository";
import { ObtenerUniversidades } from "../../application/use-cases/general/ObtenerUniversidades.use-case";
import { ObtenerCarreras } from "../../application/use-cases/general/ObtenerCarreras.use-case";


export class GeneralController {

    constructor(
        private readonly generalRepository: GeneralRepository
    ) { }

    private handleError = (error: unknown, res: Response) => {

        if (error instanceof CustomError) {
            //retornamos el error en el response
            return res.status(error.statusCode).json({ message: error.message });
        }

        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

    getEspecialidades = async (req: Request, res: Response): Promise<any> => {
        const useCase = new ObtenerEspecialidades(this.generalRepository);
        useCase.execute()
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    };
    getGradosAcademicos = async (req: Request, res: Response): Promise<any> => {
        const useCase = new ObtenerGradosAcademicos(this.generalRepository);
        useCase.execute()
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    };

    getUniversidades = async (req: Request, res: Response): Promise<any> => {
        const useCase = new ObtenerUniversidades(this.generalRepository);
        useCase.execute()
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    };
    getCarrerasProfesionales = async (req: Request, res: Response): Promise<any> => {
        const useCase = new ObtenerCarreras(this.generalRepository);
        useCase.execute()
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    };

}