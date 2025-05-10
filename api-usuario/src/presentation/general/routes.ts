// En este archivo se definen las rutas del endpoint auth
import { Router } from "express";
import { AuthController } from "./controller";
import { EspecialidadRepositoryImpl } from '../../infrastructure/repositories/EspecialidadRepositoryImpl';
import { EspecialidadDatasourceImpl } from '../../infrastructure/datasources/EspecialidadDatasourceImpl';
import { AuthDatasourceImpl } from "../../infrastructure";

export class GeneralRoutes{
    
    static get routes(): Router{
        
        const router = Router();
        // creamos objetos de las implementaciones
        const datasource = new AuthDatasourceImpl();
        const especialidadDatasource = new EspecialidadDatasourceImpl();
        const especialidadRepository = new EspecialidadRepositoryImpl(especialidadDatasource);

        // finalmente pasamos el repository al controlador
        const controller = new AuthController(especialidadRepository);

        try {
            // router.get('/',[AuthMiddleware.validateJWT], controller.getUsers );
            router.get('/especialidades', controller.getEspecialidades);

        } catch (error) {
            console.log(error)
        }

        return router;
    }
}