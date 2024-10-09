import { Request, Response } from "express";
import { CreateCategoryDTO, CustomError } from "../../domain";
import { CategoryService } from "../services";
import { PaginationDTO } from "../../domain/dtos/shared/pagination.dto";


export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ){}

    private handleError = (error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
          return res.status(error.statusCode).json({ error: error.message });
        }
    
        console.log(`${ error }`);
        return res.status(500).json({ error: 'Internal server error' })
    } 

    async getCategories(request: Request, response: Response) {
        const [error, paginationDto] = PaginationDTO.create(request.query)
        if(error) return this.handleError(CustomError.badRequest(error), response);

        this.categoryService.getCategories(paginationDto!)
            .then( categories => response.status(200).json(categories))
            .catch( error => this.handleError(error, response))
    }
    
    async createCategory(request: Request, response: Response) {
        const [error, createCategoryDTO] = CreateCategoryDTO.create(request.body); 
        if(error) return this.handleError(CustomError.badRequest(error), response);
        
        this.categoryService.createCategory(createCategoryDTO!, request.body.user)
            .then( category => response.status(201).json( category ))
            .catch( error => this.handleError(error, response) )
    }

}