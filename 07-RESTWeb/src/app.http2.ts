import http2 from "http2"
import fs from "fs"

const PRIVATE_KEY_PATH = "./keys/server.key";
const CERTIFICATE_PATH = "./keys/server.crt"

const secureServerOptions: http2.SecureServerOptions = {
    key: fs.readFileSync(PRIVATE_KEY_PATH),
    cert: fs.readFileSync(CERTIFICATE_PATH)
}

const requestHandler = ( request: http2.Http2ServerRequest, response: http2.Http2ServerResponse ) => {
    
    if(request.url === "/"){
        const indexHtmlFile = fs.readFileSync("../public/index.html", "utf-8");
        response.writeHead(200, { "Content-Type": "text/html"}); 
        response.end (indexHtmlFile)
        return;
    } else if(request.url?.endsWith(".js")){
        response.writeHead(200, { "Content-Type": "application/javascript"});
    } else if(request.url?.endsWith(".css")){
        response.writeHead(200, { "Content-Type": "text/css"});   
    } else if(request.url?.endsWith(".ico")) return;

    const responseContent = fs.readFileSync(`../public/${ request.url }`, "utf-8");         
    response.end(responseContent);
}

const server = http2.createSecureServer(secureServerOptions, requestHandler );

server.listen(3000)