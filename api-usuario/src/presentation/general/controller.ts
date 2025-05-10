import { Request, Response } from "express"
import { AuthRepository, CustomError, RegisterUserDto } from "../../domain";
import { ObtenerEspecialidades } from "../../application/use-cases/general/ObtenerEspecialides.use-case";
import { EspecialidadRepository } from '../../domain/repositories/EspecialidadRepository';
import { ObtenerGradosAcademicos } from "../../application/use-cases/general/ObtenerGradosAcademicos.use-case";
import { GradoAcademicoRepository } from '../../domain/repositories/GradoAcademicoRepository';


export class AuthController {

    constructor(
        // inyectamos la abstracción (clase abstracta), no la implementación
        private readonly especialidadRepository: EspecialidadRepository,
        private readonly gradoAcademicoRepository: GradoAcademicoRepository
    ) { }

    private handleError = (error: unknown, res: Response) => {

        if (error instanceof CustomError) {
            //retornamos el error en el response
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    getEspecialidades = async (req: Request, res: Response): Promise<any> => {
        const useCase = new ObtenerEspecialidades(this.especialidadRepository);
        useCase.execute()
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    };
    getGradosAcademicos = async (req: Request, res: Response): Promise<any> => {
        const useCase = new ObtenerGradosAcademicos(this.gradoAcademicoRepository);
        useCase.execute()
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    };


}