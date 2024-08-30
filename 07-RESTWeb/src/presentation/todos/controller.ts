import { Request, Response, } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDTO } from "../../domain/dto";
import { UpdateTodoDTO } from "../../domain/dto/todos/update-todo.dto";

export class TodosController {
    
   
    constructor( /*DI*/){}

    public getTodos = async( request: Request, response: Response ) => {
        const todos = await prisma.todo.findMany();

        return response.json(todos)
    }

    public getTodoById = async( request: Request, response: Response ) => {
        const id = +request.params.id;
        
        if(isNaN(id)) response.status(400).json({error: `id argument is not a number`})

        const todo = await prisma.todo.findFirst({
            where: { id }
        });

        (todo) 
        ? response.json(todo) 
        : response.status(404).json({error: `Todo with id ${id} not found`})


    }

    public createTodo = async ( request: Request, response: Response ) => {
        
        const [ error, createTodoDTO] = CreateTodoDTO.create(request.body);

        if (error) return response.status(400).json( { error } )

        const todo = await prisma.todo.create({
            data: createTodoDTO!
        });

        response.json( todo )

    }

    public updateTodo = async( request: Request, response: Response ) => {
        const id = +request.params.id;
        
        const [error, updateTodoDTO] = UpdateTodoDTO.create({ ...request.body, id })
        
        if (error ) return response.status( 400 ).json( { error } );
        
        const todo = await prisma.todo.findFirst({ where: { id }});
        if ( !todo ) return response.status( 404 ).json( { error: `Todo with id ${ id } not found` } );
    
        
        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: updateTodoDTO!.values
        })        
    
        response.json( updatedTodo );
    }

    public deleteTodo = async (request:Request, response: Response) => {
        const id = +request.params.id;
    
        const todo = await prisma.todo.findFirst({ where: { id }});
        if ( !todo ) return response.status(404).json({ error: `Todo with id ${ id } not found` });
    
        
        const deletedTodo = await prisma.todo.delete({ where: { id }});

        response.json( deletedTodo );
    
    }
}