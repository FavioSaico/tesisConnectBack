
import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config/jwt';
// import { UserModel } from '../../infrastructure/data/mongodb';
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { AuthRepository } from '../../domain';
import { UserByIdUseCase } from '../../application/use-cases/auth';
import { AuthResponseDto } from '../../domain/dtos/auth/auth-response.dto';

export class AuthMiddleware {

    // NextFunction es la función que se llamara cuando la validación sea correcta
    static validateJWT = async(req: Request, res: Response, authRepository: AuthRepository ): Promise<boolean | { exist: boolean, user: AuthResponseDto }> => {
    
        const token = req.cookies['accessToken']
        try {
    
            if(!token) return false
            
            // implementamos el METODO validateToken
            const payload = await JwtAdapter.validateToken<{id:string}>(token);
            if ( !payload ) return false;

            // Con el id del usuario es que vamos a obtenerkis y validarlo
            const user = await authRepository.conseguirInformacionPorID(Number(payload.id));

            if ( !user ) return false;

            return {
                exist: true,
                user
            };
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }

    }

    static validateRequest = (dtoClass: any) => {
    
        return async(req: Request, res: Response, next: NextFunction ): Promise<any> => {

            const dtoInstance = plainToInstance(dtoClass, req.body);

            const errors = await validate(dtoInstance);

            if (errors.length > 0) {
                // Mapear los errores para responderlos de forma clara
                const errorMessages = errors.map(err => ({
                    property: err.property,
                    constraints: err.constraints
                }));
        
                return res.status(400).json({
                    message: "Fallo en la validación",
                    errors: errorMessages
                });
            }

            next();
        }
    }

}