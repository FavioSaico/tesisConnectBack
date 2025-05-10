// En este archivo se definen las rutas del endpoint auth
import { Router } from "express";
import { AuthController } from "./controller";
import { GeneralDatasourceImpl } from '../../infrastructure/datasources/general.datasource.impl';
import { GeneralRepositoryImpl } from '../../infrastructure/repositories/general.repository.impl';
import { AuthDatasourceImpl } from "../../infrastructure";

export class GeneralRoutes {

    static get routes(): Router {

        const router = Router();
        // creamos objetos de las implementaciones
        const datasource = new AuthDatasourceImpl();
        const generalDatasource = new GeneralDatasourceImpl();

        // Repository unificado
        const generalRepository = new GeneralRepositoryImpl(generalDatasource, generalDatasource);

        // Controlador con repositorio unificado
        const controller = new AuthController(generalRepository, generalRepository);

        try {
            // router.get('/',[AuthMiddleware.validateJWT], controller.getUsers );
            router.get('/especialidades', controller.getEspecialidades);
            router.get('/gradosAcademicos', controller.getGradosAcademicos);

        } catch (error) {
            console.log(error)
        }

        return router;
    }
}