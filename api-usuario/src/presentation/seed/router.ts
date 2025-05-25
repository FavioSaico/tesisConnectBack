import { Router } from "express";
import { SeedController } from "./controller";

export class SeedRoutes{
    
  static get routes(): Router{
    const router = Router();

    // finalmente pasamos el repository al controlador
    const controller = new SeedController();

    try {
        // aquí solo apuntamos a nuestros controladores
        router.get('/gradoAcademico', controller.registerGradoAcademico);
        router.get('/especialidades', controller.registerEspecialidades);
        router.get('/carreras', controller.registerCarrerasProfesionales);
        router.get('/universidades', controller.registerUniversidades);

    } catch (error) {
        console.log(error)
    }

    return router;
  }
}