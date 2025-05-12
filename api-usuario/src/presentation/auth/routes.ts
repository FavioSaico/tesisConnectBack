// En este archivo se definen las rutas del endpoint auth
import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { RegisterUserDto } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";

export class AuthRoutes{
    
    static get routes(): Router{
        
        const router = Router();
        // creamos objetos de las implementaciones
        const datasource = new AuthDatasourceImpl();
        const authRepository = new AuthRepositoryImpl(datasource);

        // finalmente pasamos el repository al controlador
        const controller = new AuthController(authRepository);

        try {
            // aquí solo apuntamos a nuestros controladores
            router.post('/login',[AuthMiddleware.validateRequest(LoginUserDto)], controller.loginUser);

            router.post('/register',[AuthMiddleware.validateRequest(RegisterUserDto)], controller.registerUser);

            router.get('/informacion/:id', controller.conseguirInformacionPorID);


        } catch (error) {
            console.log(error)
        }

        return router;
    }
}