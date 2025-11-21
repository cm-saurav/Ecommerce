import { CategoryModel } from "../../models/admin/categoryModel.ts";
import { Op } from "sequelize";
import { CategoryStatus } from "../../interfaces/admin/ICategory.ts";
export class CategoryDao{
    async create(data: any) {
        try {
            const result = await CategoryModel.create(data);
            return result

        } catch (error) {
            throw error;
        }

    }
     async findBySlug(slug: string) {
        try {
            const result =  await CategoryModel.findOne({ where: { slug } });
            return result;
        } catch (error) {
            throw error;
        }
        
    }

    async getAll(params: { offset: number; limit: number; search: string }) {
        try {
            const { offset, limit, search } = params;

            let where: any = {};

            if (search) {
                where = {
                    [Op.or]: [
                        { name: { [Op.iLike]: `%${search}%` } },
                        { description: { [Op.iLike]: `%${search}%` } }
                    ]
                }
            }

            const result = await CategoryModel.findAndCountAll({
                where,
                order: [["created_at", "DESC"]],
                offset,
                limit
            });

            return {
                total: result.count,
                page: offset / limit + 1,
                limit,
                data: result.rows
            };

        } catch (error) {
            throw error;
        }
    }
    async updateCategoryById( categoryId:string, payload:any){
        try {
            const [updated] = await CategoryModel.update(payload,{
                where : {id: categoryId}
            });
            if(!updated){
                throw new Error("category is  not found")
            }
            const updatedCategory = await CategoryModel.findByPk(categoryId);
             return updatedCategory;
        } catch (error) {
            throw error;
        }
    }

     async softDelete( categoryId:string){
        try {
           const [result] = await CategoryModel.update(
            {status:CategoryStatus.INACTIVE},
            {where:{id:categoryId}}
           ) ;
           return result;
        } catch (error) {
            throw error;
        }
    }

    async findById(categoryId: string):Promise<any>{
        try {
            return await CategoryModel.findOne({where:{id: categoryId}})
        } catch (error) {
            throw error
        }
    }
    
}