
import { Server } from "./presentation/server"
import { AppDataSource, initDatabase, Usuario } from "./infrastructure/database/mysql";
import { envs } from "./config";
import { AppRoutes } from "./presentation/routes";

async function main() {

    await initDatabase()

    // console.log(AppDataSource.entityMetadatas.map(e => e.name));
    // const photoRepository = AppDataSource.getRepository(Usuario)
    // const allPhotos = await photoRepository.find()
    // console.log("All photos from the db: ", allPhotos)

    new Server({
        port: envs.PORT,
        routes: AppRoutes.routes,
    }).start();
}

(()=>{
    main()
})()

