import { CategoryDao } from "../../daos/admin/categoryDao.ts";
import { APIError } from "../../common/error.ts";
import { slugify } from "../../utils/helper.ts";

export class CategoryService{
    
    constructor(private dao : CategoryDao){
        this.dao = dao;
    }

    async create(payload:{name: string, description?: string}):Promise<any>{
         try {
            const slug = slugify(payload.name);
            const exist = await this.dao.findBySlug(slug);
            if(exist){
                throw new APIError('category exist', 400)
            }
            const dbPayload = {
                name: payload.name,
                description: payload.description,
                slug,


            }
            const result = await this.dao.create(dbPayload);
            return result;
         } catch (error) {
            throw new APIError('failed to adding the category', 500)
         }

    }

      async getAll(query: { page: number; limit: number; search: string }): Promise<any> {
        try {
            const { page, limit, search } = query;
            const offset = (page - 1) * limit;

            return await this.dao.getAll({
                offset,
                limit,
                search
            });
        } catch (error) {
            throw new APIError("Failed to fetch categories", 500);
        }
    }

 async updateById( categoryId:string, payload:any):Promise<any>{
    try {
        const result = await this.dao.updateCategoryById(categoryId, payload);
        return result;
    } catch (error) {
        throw new APIError("Failed to update categories", 500);
    }
 }


 async deleteById( categoryId:string):Promise<any>{
    try {
        const existing = await this.dao.findById(categoryId);
        if(!existing){
            throw new APIError('category not found ', 404)
        }
        const  result = await this.dao.softDelete(categoryId);
        return result;
    } catch (error) {
        throw new APIError("Failed to deleted categories", 500);
    }
 }
}