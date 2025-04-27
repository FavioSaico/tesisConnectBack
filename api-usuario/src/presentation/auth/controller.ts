import { Request, Response } from "express"
import { AuthRepository, CustomError, RegisterUserDto } from "../../domain";
import { JwtAdapter } from "../../config/jwt";
import { RegisterUser } from "../../application/use-cases/auth/register-user.use-case";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { LoginUser } from "../../application/use-cases/auth/login-user.use-case";

export class AuthController{
    
    constructor (
        // inyectamos la abstracción (clase abstracta), no la implementación
        private readonly authRepostory: AuthRepository,
    ){}

    // unknown porque puede ser una excepcion controlado por nosotros o un error cualquiera
    private handleError = ( error: unknown, res: Response ) => {
        
        if ( error instanceof CustomError ) {
            //retornamos el error en el response
            return res.status(error.statusCode).json({ error: error.message });
        }
    
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    registerUser = async (req: Request, res:Response): Promise<any> => {
        
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if(error) return res.status(400).json({error});
        
        // caso de uso
        new RegisterUser(this.authRepostory)
            .execute( registerUserDto! )
            .then( data => res.json(data) )
            .catch( error => this.handleError(error, res) );
    }

    loginUser = async(req: Request, res:Response): Promise<any> => {

        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if(error) return res.status(400).json({error});


        // repositorio en el controlador directamente
        // this.authRepostory.login(loginUserDto!)// colocamos ! para indicar que no será un null
        //     .then(async (user) => {
        //         res.json({
        //             user,
        //             token: await JwtAdapter.generateToken({id: user.id}) // devolvemos el token, guardaremos el id del usuario
        //         })
        //     }) // retorna el usuario tipo UserEntity, se logeo el usuarios
        //     .catch(error => this.handleError(error, res))
        // ; 
        // caso de uso
        new LoginUser(this.authRepostory)
            .execute(loginUserDto!)
            .then( data => res.json(data) )
            .catch( error => this.handleError(error, res) );
    }


    // getUsers = (req: Request, res: Response ) => {
    
    //     // no colocamos un filtro, por lo que retorna todos los usuarios
    //     UserModel.find()
    //         .then( users => {
    //             res.json({
    //                 users,
    //                 userJWT: req.body.user // usuario que tiene el token
    //             }) 
    //         })
    //         .catch(()=> res.status(500).json({ error: 'Internal server error' }))
    
    // }
}