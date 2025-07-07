import { Request, Response } from "express"
import { AuthRepository, CustomError, RegisterUserDto } from "../../domain";
import { RegisterUser } from "../../application/use-cases/auth/register-user.use-case";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { LoginUser } from "../../application/use-cases/auth/login-user.use-case";
import { plainToInstance } from "class-transformer";
import { UserByIdUseCase } from "../../application/use-cases/auth/user-by-id.use-case";
import { UsersByIdsUseCase } from "../../application/use-cases/auth/users-by-ids.use-case";

export class AuthController {

    constructor(
        private readonly authRepostory: AuthRepository,
    ) { }

    private handleError = (error: unknown, res: Response) => {

        if (error instanceof CustomError) {
            
            return res.status(error.statusCode).json({ message: error.message });
        }

        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

    registerUser = async (req: Request, res: Response): Promise<any> => {

        const registerUserDto = plainToInstance(RegisterUserDto, req.body);

        // caso de uso
        new RegisterUser(this.authRepostory)
            .execute(registerUserDto!)
            .then(data => {
                res.cookie('accessToken', data.token, {
                    httpOnly: true,
                    secure: true, // ✅ solo en HTTPS en prod
                    sameSite: 'none', // o 'strict'
                    maxAge: 1000 * 60 * 60 * 24
                });
                res.json({
                    usuario: data.usuario,
                    token: '-'
                })
            })
            .catch(error => this.handleError(error, res));
    }

    loginUser = async (req: Request, res: Response): Promise<any> => {

        const loginUserDto = plainToInstance(LoginUserDto, req.body);

        // caso de uso
        new LoginUser(this.authRepostory)
            .execute(loginUserDto!)
            .then(data => {
                res.cookie('accessToken', data.token, {
                    httpOnly: true,
                    secure: true, // ✅ solo en HTTPS en prod
                    sameSite: 'none', // o 'strict'
                    maxAge: 1000 * 60 * 60 * 24
                });
                res.json({
                    usuario: data.usuario,
                    token: '-'
                })
            })
            .catch(error => this.handleError(error, res));
    }
    
    conseguirInformacionPorID = async (req: Request, res: Response): Promise<any> => {
        try {
            const id = parseInt(req.params.id);
        
            if(Number.isNaN(id)) {
                throw CustomError.badRequest('Usuario no encontrado');
            }
            
            new UserByIdUseCase(this.authRepostory)
            .execute(id)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
            
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message || 'Error interno del servidor' });
        }
    }

    usuariosPorIds = async (req: Request, res: Response): Promise<any> => {
        try {
            const { ids }=  req.body;

            if (!Array.isArray(ids)) {
                throw CustomError.badRequest('ids debe ser un arreglo');
            }
            
            new UsersByIdsUseCase(this.authRepostory)
                .execute(ids)
                .then(data => res.json(data))
                .catch(error => this.handleError(error, res));

        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message || 'Error interno del servidor' });
        }
    }
}


