import { UpdateTodoDTO } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface UpdateTodoUseCase {
    execute( dto: UpdateTodoDTO ): Promise<TodoEntity>
}


export class UpdateTodo implements UpdateTodoUseCase {
    constructor(
        private readonly repository: TodoRepository
    ){}
    
    async execute(dto: UpdateTodoDTO): Promise<TodoEntity> {
        return await this.repository.update(dto)
    }
}