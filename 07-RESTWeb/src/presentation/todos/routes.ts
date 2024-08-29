import { Router } from "express";
import { TodosController } from "./controller";

export class TodoRoutes {
   
    static get routes(): Router{
        const router = Router();
        const toDoController = new TodosController()

        router.get("/", toDoController.getTodos)
        router.get("/:id", toDoController.getTodoById)
        
        router.post("/", toDoController.createTodo)
        router.put("/:id", toDoController.updateTodo)
        
        router.delete("/:id", toDoController.updateTodo)

        return router;
    }
}