import { Request, Response, } from "express";
import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/dtos";
import { CreateTodo, DeleteTodo, GetAllTodos, GetTodo, TodoRepository, UpdateTodo } from "../../domain";

export class TodosController {
    
   
    constructor( 
        private readonly repository: TodoRepository
    ){}

    public getTodos = ( request: Request, response: Response ) => {
        new GetAllTodos( this.repository )
         .execute()
         .then( todos => response.json(todos) )
         .catch( error => response.status(500).json({error}) )
    }

    public getTodoById = ( request: Request, response: Response ) => {
        const id = +request.params.id;
        new GetTodo( this.repository )
         .execute( id )
         .then( response.json )
         .catch( error => response.status(400).json({error})) 
    }

    public createTodo = async ( request: Request, response: Response ) => {
        
        const [ error, createTodoDTO] = CreateTodoDTO.create(request.body);

        if (error) return response.status(400).json( { error } )

        new CreateTodo( this.repository )
         .execute( createTodoDTO! )
         .then( response.json )
         .catch( error => response.status(500).json({error}) )

    }

    public updateTodo = async( request: Request, response: Response ) => {
        const id = +request.params.id;
        const [error, updateTodoDTO] = UpdateTodoDTO.create({ ...request.body, id })
        if (error ) return response.status( 400 ).json( { error } );

        new UpdateTodo( this.repository )
         .execute( updateTodoDTO! )
         .then( response.json )
         .catch( error => response.status(500).json({error}) )
    }

    public deleteTodo = async (request:Request, response: Response) => {
        const id = +request.params.id;
    
        new DeleteTodo( this.repository )
         .execute( id )
         .then( response.json )
         .catch( error => response.status(400).json({error})) 
    
    }
}