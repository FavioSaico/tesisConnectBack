import { Request, Response } from "express"
import { AuthRepository, CustomError, RegisterUserDto } from "../../domain";
import { RegisterUser } from "../../application/use-cases/auth/register-user.use-case";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { LoginUser } from "../../application/use-cases/auth/login-user.use-case";
import { plainToInstance } from "class-transformer";


export class AuthController {

    constructor(
        // inyectamos la abstracción (clase abstracta), no la implementación
        private readonly authRepostory: AuthRepository,
    ) { }

    private handleError = (error: unknown, res: Response) => {

        if (error instanceof CustomError) {
            //retornamos el error en el response
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    registerUser = async (req: Request, res: Response): Promise<any> => {

        const registerUserDto = plainToInstance(RegisterUserDto, req.body);

        // caso de uso
        new RegisterUser(this.authRepostory)
            .execute(registerUserDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    }

    loginUser = async (req: Request, res: Response): Promise<any> => {

        const loginUserDto = plainToInstance(LoginUserDto, req.body);

        // caso de uso
        new LoginUser(this.authRepostory)
            .execute(loginUserDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    }


}