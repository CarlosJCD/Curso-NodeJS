import http from "http"
import fs from "fs"

const server = http.createServer(( request, response ) => {
    
    
    if(request.url === "/"){
        const indexHtmlFile = fs.readFileSync("../public/index.html", "utf-8");
        response.writeHead(200, { "Content-Type": "text/html"}); 
        response.end(indexHtmlFile)
        return;
    }
    
    if(request.url?.endsWith(".ico")) return;
    
    if(request.url?.endsWith(".js")){
        response.writeHead(200, { "Content-Type": "application/javascript"});
    } else if(request.url?.endsWith(".css")){
        response.writeHead(200, { "Content-Type": "text/css"});   
    }

    const responseContent = fs.readFileSync(`../public/${ request.url }`, "utf-8");         
    response.end(responseContent);
});

server.listen(3000)