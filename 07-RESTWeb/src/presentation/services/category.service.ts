import { CategoryModel } from "../../data";
import { CreateCategoryDTO, CustomError } from "../../domain";
import { PaginationDTO } from "../../domain/dtos/shared/pagination.dto";
import { UserEntity } from "../../domain/entities";

export class CategoryService{
    
    constructor(){}


    async getCategories(paginationDto: PaginationDTO){
        try {
            const {page, limit} = paginationDto;
            
            
            const [total, dbCategories] = await Promise.all([
                CategoryModel.countDocuments(),
                CategoryModel.find().skip( (page - 1) * limit ).limit(limit)
            ])

            const nextPageURl = `/api/categories/page=${page}&limit=${limit}`
            const previousPageURl = (page - 1 > 0) ? `/api/categories/page=${page-1}&limit=${limit}`: null;

            const categories = dbCategories.map( dbCategory => ({ id: dbCategory.id, name: dbCategory.name, available: dbCategory.available}));

            return {
                page,
                limit,
                total,
                next: nextPageURl,
                prev: previousPageURl,
                categories
            }

        } catch (error) {
            console.log(error)  
            throw CustomError.internalServer("Something went wrong at retrieving the categories")
        }
    }

    async createCategory(createCategoryDto: CreateCategoryDTO, user: UserEntity){
        
        const categoryExists = await CategoryModel.findOne({name: createCategoryDto.name});
        if( categoryExists ) throw CustomError.badRequest("Category already exists")

        try {
            const category = new CategoryModel({
                ...createCategoryDto,
                user: user.id
            });

            await category.save();

            return {
                id: category.id,
                name: category.name,
                available: category.available
            }

        } catch (error) {
            console.log(error)  
            throw CustomError.internalServer("Something went wrong at creating the category")
        }
    }
}