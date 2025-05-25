
import { Server } from "./presentation/server"
import { AppRoutes } from "./presentation/routes";
import { initDatabase } from "./infrastructure/database/mysql";
import { envs } from "./config";
import { ServerGraphQL } from "./graphql/server";

async function main() {

    await initDatabase()

    new Server({
        port: envs.PORT,
        routes: AppRoutes.routes,
    }).start();
    
    new ServerGraphQL({
        port: 4000,
    }).start();
}

(()=>{
    main()
})()

