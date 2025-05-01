// En este archivo se definen las rutas del endpoint ORCID
import { Router } from "express";
import { OrcidController } from "./controller";
import { OrcidApiDatasource } from "../../infrastructure/datasources/orcid-api.datasource";
import { OrcidRepositoryImpl } from "../../infrastructure/repositories/orcid.repository";

export class OrcidRoutes {

  static get routes(): Router {

    const router = Router();

    // creamos datasource y repositorio
    const datasource = new OrcidApiDatasource();
    const repository = new OrcidRepositoryImpl(datasource);
    const controller = new OrcidController(repository);

    // definimos las rutas del controlador
    router.get('/:id', controller.getUserById); // GET /api/orcid/:id

    return router;
  }
}