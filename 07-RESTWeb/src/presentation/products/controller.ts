import { Request, Response } from "express";

import { ProductService } from "../services";
import { CustomError } from "../../domain";
import { PaginationDTO } from "../../domain/dtos";
import { CreateProductDTO } from "../../domain/dtos/product/create-product.dto";

export class ProductController {
    
    constructor(
        private readonly productService: ProductService
    ){}

    private handleError = (error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
          return res.status(error.statusCode).json({ error: error.message });
        }
    
        console.log(`${ error }`);
        return res.status(500).json({ error: 'Internal server error' })
    } 

    async getProducts(request: Request, response: Response) {
        const [error, paginationDto] = PaginationDTO.create(request.query)
        if(error) return this.handleError(CustomError.badRequest(error), response);

        this.productService.getProducts(paginationDto!)
            .then( products => response.status(200).json(products))
            .catch( error => this.handleError(error, response))
    }

    async createProduct(request: Request, response: Response){
        const [error, createProductDTO] = CreateProductDTO.create({
            ...request.body, 
            user:  request.body.user.id
        }); 
        if(error) return this.handleError(CustomError.badRequest(error), response);
        
        this.productService.createProduct(createProductDTO!)
            .then( category => response.status(201).json( category ))
            .catch( error => this.handleError(error, response) )
    }
}