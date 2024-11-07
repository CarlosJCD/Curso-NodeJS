import { Router } from "express";
import { FileUploadController } from "./controller";
import { CategoryService, FileUploadService } from "../services";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { FileUploadMiddleware } from "../middlewares/file-upload.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";


export class FileUploadRoutes {
   
    static get routes(): Router {

        const router = Router();
        const controller = new FileUploadController(
          new FileUploadService()
        );
    
    
        router.use( FileUploadMiddleware.containFiles );
        router.use( TypeMiddleware.validTypes(['users','products','categories']) );
    
        
        // Definir las rutas
        // api/upload/single/<user|category|product>/
        // api/upload/multiple/<user|category|product>/
        router.post( '/single/:type', controller.uploadFile );
        router.post( '/multiple/:type',controller.uploadMultileFiles );
    
    
    
    
        return router;
      }
}