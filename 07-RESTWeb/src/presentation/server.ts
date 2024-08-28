import express from "express";
import path from "path";

interface ServerOptions{
    PORT: number,
    PUBLIC_DIR_NAME: string
}

export class Server {
    
    private app = express();
    private PORT: number;
    private PUBLIC_DIR_NAME: string;
    
    constructor(options: ServerOptions){
        this.PORT = options.PORT;
        this.PUBLIC_DIR_NAME = options.PUBLIC_DIR_NAME;
    }

    async start(){

        this.app.use( express.static( this.PUBLIC_DIR_NAME ))

        this.app.get( "*" , (request, response) => {
            const indexPath = path.join(__dirname + `../../../${this.PUBLIC_DIR_NAME}/index.html`);
            response.sendFile(indexPath);
        })

        this.app.listen(this.PORT, () => {
            console.log("Listening on port " + this.PORT);
        })
    }
}