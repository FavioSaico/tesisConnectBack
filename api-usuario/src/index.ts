
import { Server } from "./presentation/server"
import { AppRoutes } from "./presentation/routes";
import { initDatabase } from "./infrastructure/database/mysql";
import { envs } from "./config";
import { ServerGraphQL } from "./graphql/server";

async function main() {

    await initDatabase()

    if(envs.API_MODE === 'rest') {
        new Server({
            port: envs.PORT,
            routes: AppRoutes.routes,
        }).start();
    }else {
        new ServerGraphQL({
            port: envs.PORT,
        }).start();
    }

    // new Server({
    //     port: 4000,
    //     routes: AppRoutes.routes,
    // }).start();

    // new ServerGraphQL({
    //     port: envs.PORT,
    // }).start();   

}

(()=>{
    main()
})()

