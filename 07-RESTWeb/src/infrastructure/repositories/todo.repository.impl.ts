import { CreateTodoDTO, TodoDataSource, TodoEntity, TodoRepository, UpdateTodoDTO } from "../../domain";

export class TodoRepositoryImpl implements TodoRepository{
    constructor(
        private readonly datasource: TodoDataSource
    ){}

    create(createTodo: CreateTodoDTO): Promise<TodoEntity> {
        return this.datasource.create(createTodo);
    }
    getAll(): Promise<TodoEntity[]> {
        return this.datasource.getAll();
    }
    findById(id: number): Promise<TodoEntity> {
        return this.datasource.findById(id);
    }
    update(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity> {
        return this.datasource.update(updateTodoDTO);
    }
    deleteById(id: number): Promise<TodoEntity> {
        return this.datasource.deleteById(id);
    }

}