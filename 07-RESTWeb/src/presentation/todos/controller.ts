import { Request, Response, } from "express";

const todos = [
    { id: 1, text: "Lavar trastes", completedAt: new Date() },
    { id: 2, text: "Darle de comer a los perros", completedAt: null },
    { id: 3, text: "Cocinar", completedAt: new Date() },
]

export class TodosController {
    
    constructor(){}

    public getTodos = ( request: Request, response: Response ) => {
        return response.json(todos)
    }

    public getTodoById = ( request: Request, response: Response ) => {
        const id = +request.params.id;
        
        if(isNaN(id)) response.status(400).json({error: `id argument is not a number`})

        const todo = todos.find(todo => todo.id === id);

        (todo) 
        ? response.json(todo) 
        : response.status(404).json({error: `Todo with id ${id} not found`})


    }

    public createTodo = ( request: Request, response: Response ) => {
        const { text } = request.body

        if (!text) return response.status(400).json( { error: "text property is required"} )

        const newTodo = {
            id: todos.length + 1,
            text,
            completedAt: null
        }

        todos.push( newTodo )

        response.json( newTodo )

    }

    public updateTodo = ( req: Request, res: Response ) => {
        const id = +req.params.id;
        if ( isNaN( id ) ) return res.status( 400 ).json( { error: 'ID argument is not a number' } );
        
        const todo = todos.find( todo => todo.id === id );
        if ( !todo ) return res.status( 404 ).json( { error: `Todo with id ${ id } not found` } );
    
        const { text, completedAt } = req.body;
        
        todo.text = text || todo.text;
        ( completedAt === 'null' )
          ? todo.completedAt = null
          : todo.completedAt = new Date( completedAt || todo.completedAt );
        
    
        res.json( todo );
    
    }

    public deleteTodo = (req:Request, res: Response) => {
        const id = +req.params.id;
    
        const todo = todos.find(todo => todo.id === id );
        if ( !todo ) return res.status(404).json({ error: `Todo with id ${ id } not found` });
    
        todos.splice( todos.indexOf(todo), 1 );
        res.json( todo );
    
      }
}