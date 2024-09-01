import { CreateTodoDTO, UpdateTodoDTO } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";


export abstract class TodoDataSource {
    abstract create( createTodo: CreateTodoDTO ):       Promise<TodoEntity>;
    abstract getAll():                                  Promise<TodoEntity[]>;
    abstract findById( id: number):                     Promise<TodoEntity>;
    abstract update( updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity>;  
    abstract deleteById( id: number):                   Promise<TodoEntity>;  
}