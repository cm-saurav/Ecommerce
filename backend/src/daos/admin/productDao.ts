import { ProductModel } from "../../models/admin/productModel.ts";
import type { IProduct } from "../../interfaces/admin/IProduct.ts";
import { CategoryModel } from "../../models/admin/categoryModel.ts";
import { ProductStatus } from "../../interfaces/admin/IProduct.ts";


export class ProductDao{
    
       async findCategoryById(category_id: string) {

        try {
            return await CategoryModel.findOne({ where: { id: category_id } });
        } catch (error) {
            throw error;
        }
        
    }

    async create(payload: IProduct) {

        try {
            return await ProductModel.create(payload);
        } catch (error) {
            throw error;
        }
        
    }

     async getAll(offset: number, limit: number) {

        try {
             return await ProductModel.findAndCountAll({
            offset,
            limit,
            order: [["created_at", "DESC"]],
            include: [
                {
                    model: CategoryModel,
                    as: "category",
                    attributes: ["id", "name", "slug","status"]
                }
            ]
        });
        } catch (error) {
            throw error;
        }
       
    }

    async getById(id: string) {
        try {
             return await ProductModel.findOne({
        where: { id },
        include: [
            {
                model: CategoryModel,
                as: "category",
                attributes: ["id", "name", "status","slug"]
            }
        ]
    });
        } catch (error) {
            throw error
    }
   
}
async updateById(id: string, payload: Partial<IProduct>) {
  try {
    await ProductModel.update(payload, { where: { id } });
    return await ProductModel.findByPk(id);
  } catch (err) {
    throw err;
  }
}

async deleteById(id: string) {
  try {
    return await ProductModel.update(
      { status: ProductStatus.INACTIVE },
      { where: { id } }
    );
  } catch (error) {
    throw error;
  }
}

}