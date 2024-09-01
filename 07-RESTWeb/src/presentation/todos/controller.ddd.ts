import { Request, Response, } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

export class TodosController {
    
   
    constructor( 
        private readonly todoRepository: TodoRepository
    ){}

    public getTodos = async( request: Request, response: Response ) => {
        
        const todos = await this.todoRepository.getAll();

        return response.json(todos)
    }

    public getTodoById = async( request: Request, response: Response ) => {
        try {
            const id = +request.params.id;
            const todo = await this.todoRepository.findById(id);

            response.json(todo);
        } catch (error) {
            response.status(400).json({error});
        }
    }

    public createTodo = async ( request: Request, response: Response ) => {
        
        const [ error, createTodoDTO] = CreateTodoDTO.create(request.body);

        if (error) return response.status(400).json( { error } )

        const todo = await this.todoRepository.create(createTodoDTO!);

        response.json( todo )

    }

    public updateTodo = async( request: Request, response: Response ) => {
        const id = +request.params.id;
        
        const [error, updateTodoDTO] = UpdateTodoDTO.create({ ...request.body, id })
        
        if (error ) return response.status( 400 ).json( { error } );


        const updatedTodo = await this.todoRepository.update(updateTodoDTO!)  
        response.json( updatedTodo );
    }

    public deleteTodo = async (request:Request, response: Response) => {
        const id = +request.params.id;
    
        const deletedTodo = await this.todoRepository.deleteById(id);

        response.json( deletedTodo );
    
    }
}