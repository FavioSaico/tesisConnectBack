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

    } catch (error) {
        console.log(error)
    }

    return router;
  }
}