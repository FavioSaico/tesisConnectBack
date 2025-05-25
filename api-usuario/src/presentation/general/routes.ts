// En este archivo se definen las rutas del endpoint auth
import { Router } from "express";
import { GeneralController } from "./controller";
import { GeneralDatasourceImpl } from '../../infrastructure/datasources/general.datasource.impl';
import { GeneralRepositoryImpl } from '../../infrastructure/repositories/general.repository.impl';

export class GeneralRoutes {

    static get routes(): Router {

        const router = Router();
        // creamos objetos de las implementaciones
        const generalDatasource = new GeneralDatasourceImpl();

        // Repository unificado
        const generalRepository = new GeneralRepositoryImpl(generalDatasource);

        // Controlador con repositorio unificado
        const controller = new GeneralController(generalRepository);

        try {

            router.get('/especialidades', controller.getEspecialidades);
            router.get('/gradosAcademicos', controller.getGradosAcademicos);
            router.get('/universidades', controller.getUniversidades);
            router.get('/carrerasProfesionales', controller.getCarrerasProfesionales);

        } catch (error) {
            console.log(error)
        }

        return router;
    }
}