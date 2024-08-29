import express, { Router } from "express";
import path from "path";
import { AppRoutes } from "./routes";

interface ServerOptions{
    PORT: number,
    PUBLIC_DIR_NAME: string,
    routes: Router
}

export class Server {
    
    private app = express();
    private readonly PORT: number;
    private readonly PUBLIC_DIR_NAME: string;
    private readonly routes: Router

    constructor(options: ServerOptions){
        this.PORT = options.PORT;
        this.PUBLIC_DIR_NAME = options.PUBLIC_DIR_NAME;
        this.routes = options.routes;
    }

    async start(){

        this.app.use( express.json() )

        this.app.use( express.static( this.PUBLIC_DIR_NAME ))

        this.app.use( this.routes )

        this.app.get( "*" , (request, response) => {
            const indexPath = path.join(__dirname + `../../../${this.PUBLIC_DIR_NAME}/index.html`);
            response.sendFile(indexPath);
        })

        this.app.listen(this.PORT, () => {
            console.log("Listening on port " + this.PORT);
        })
    }
}