import { env } from "process";
import { envs } from "./config/envs";
import { MongoDatabase } from "./data";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

( () => main() )();

async function main(){ 

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })

    new Server({
        PORT: envs.PORT,
        PUBLIC_DIR_NAME: envs.PUBLIC_DIR_NAME,
        routes: AppRoutes.routes
    }).start();
}