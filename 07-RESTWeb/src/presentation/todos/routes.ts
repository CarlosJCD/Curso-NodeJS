import { Router } from "express";
import { TodosController } from "./controller";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.repository.impl";
import { TodoDatasourceImpl } from "../../infrastructure/datasources/todo.datasource.impl";

export class TodoRoutes {
   
    static get routes(): Router{
        const router         = Router();
        const todoDatasource = new TodoDatasourceImpl();
        const todoRepository = new TodoRepositoryImpl( todoDatasource );
        const toDoController = new TodosController( todoRepository );

        router.get("/",       toDoController.getTodos   );
        router.get("/:id",    toDoController.getTodoById);
        router.post("/",      toDoController.createTodo );
        router.put("/:id",    toDoController.updateTodo );
        router.delete("/:id", toDoController.deleteTodo );

        return router;
    }
}