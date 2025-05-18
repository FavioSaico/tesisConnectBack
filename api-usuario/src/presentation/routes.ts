// En este archivo se definen todas las rutas de toda la aplicación

import { Router } from "express"; // importamos Rputer de express
import { AuthRoutes } from "./auth/routes";
import { SeedRoutes } from "./seed/router";
import { OrcidRoutes } from "./orcid/routes"; 
import { GeneralRoutes} from "./general/routes"; 
import { NotificationsRoutes } from "./relations/routes";
export class AppRoutes{

    static get routes(): Router{
        
        const router = Router();
        
        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/seed', SeedRoutes.routes);
        router.use('/api/orcid', OrcidRoutes.routes);
        router.use('/api/general', GeneralRoutes.routes);
        router.use('/api/notification', NotificationsRoutes.routes);
        
        // agregar más rutas
        // router.use('/api/products');
        // router.use('/api/clients');

        return router;
    }
}



