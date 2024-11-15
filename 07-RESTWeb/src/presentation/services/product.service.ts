import { ProductModel } from "../../data";
import { CustomError } from "../../domain";
import { PaginationDTO } from "../../domain/dtos";
import { CreateProductDTO } from "../../domain/dtos/product/create-product.dto";

export class ProductService {

    constructor(){}

    async getProducts(paginationDto: PaginationDTO){
        try {
            const {page, limit} = paginationDto;
            
            const [total, dbProducts] = await Promise.all([
                ProductModel.countDocuments(),
                ProductModel.find().skip( (page - 1) * limit ).limit(limit).populate('user', 'name email')
            ])

            const nextPageURl = `/api/products/page=${page}&limit=${limit}`
            const previousPageURl = (page - 1 > 0) ? `/api/products/page=${page-1}&limit=${limit}`: null;

            return {
                page,
                limit,
                total,
                next: nextPageURl,
                prev: previousPageURl,
                products: dbProducts
            }

        } catch (error) {
            console.log(error)  
            throw CustomError.internalServer("Something went wrong at retrieving the categories")
        }

    }

    async createProduct( createProductDTO: CreateProductDTO){
        const productExists = await ProductModel.findOne({name: createProductDTO.name});
        if( productExists ) throw CustomError.badRequest("Product name already registered")

        try {
            const product = new ProductModel({
                ...createProductDTO
            });

            await product.save();


            return product;

        } catch (error) {
            console.log(error)  
            throw CustomError.internalServer("Something went wrong at creating the product")
        }
    }

}