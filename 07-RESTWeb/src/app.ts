import { envs } from "./config/envs";
import { Server } from "./presentation/server";

( () => main() )();

function main(){ 
    new Server({
        PORT: envs.PORT,
        PUBLIC_DIR_NAME: envs.PUBLIC_DIR_NAME
    }).start();
}