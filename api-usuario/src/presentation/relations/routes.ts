// En este archivo se definen las rutas del endpoint auth
import { Router } from "express";
import { RelationsController } from "./controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { RequestAdviceDto } from "../../domain";
import { RelacionesRepositoryImpl } from "../../infrastructure/repositories/relations.repository.impl";
import { RelationesDatasourceImpl } from "../../infrastructure/datasources/relations.datasource.impl";

export class NotificationsRoutes {

    static get routes(): Router {

        const router = Router();

        const relacionesDatasource = new RelationesDatasourceImpl();
        const relacionesRepostory = new RelacionesRepositoryImpl(relacionesDatasource);

        const controller = new RelationsController(relacionesRepostory);

        try {
            router.post('/sendNotication',[AuthMiddleware.validateRequest(RequestAdviceDto)], controller.sendNotificationByEmail);

        } catch (error) {
            console.log(error)
        }

        return router;
    }
}