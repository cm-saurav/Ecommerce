import { ProductDao } from "../../daos/admin/productDao.ts";
import { CategoryDao } from "../../daos/admin/categoryDao.ts";
import type { IProduct } from "../../interfaces/admin/IProduct.ts";
import { calculateSaleAndDiscount,generateSKU } from "../../utils/helper.ts";
import { APIError } from "../../common/error.ts";


export class ProductService{
    
    constructor(private dao : ProductDao){
            this.dao = dao;
        }

    async create(payload: IProduct) {
    try {
        const category = await this.dao.findCategoryById(payload.category_id!);
        if (!category) throw new Error("Invalid category_id");

        // 2. Auto calculate via helper
        const { sale_price, discount_percentage } = calculateSaleAndDiscount({
            mrp_price: payload.mrp_price,
            sale_price: payload.sale_price,
            discount_percentage: payload.discount_percentage
        });

        // 3. Auto generate SKU
        const sku = generateSKU(payload.name!, category.name);

        const finalPayload: IProduct = {
            ...payload,
            sale_price,
            discount_percentage,
            sku,
            
        };

        return await this.dao.create(finalPayload);

    } catch (error: any) {
        throw new APIError(`Error in creating product: ${error.message}`, 500);
    }
}

 async getAll(page: number, limit: number) {

    try {
           const offset = (page - 1) * limit;

        const data = await this.dao.getAll(offset, limit);

        return {
            total: data.count,
            page,
            limit,
            totalPages: Math.ceil(data.count / limit),
            products: data.rows,
        };
    } catch (error:any) {
        throw new APIError(`Error in fetcing product: ${error.message}`, 500)
    }
     
    }
    async getById(id: string) {
    const product = await this.dao.getById(id);

    if (!product) {
        throw new Error("Product not found");
    }

    return product;
}

async updateById(id: string, payload: Partial<IProduct>) {
  try {
    const existing = await this.dao.getById(id);
    if (!existing) throw new Error("Product not found");

    return await this.dao.updateById(id, payload);
  } catch (err:any) {
    throw new Error("Error updating product: " + err.message);
  }
}

async deleteById(id: string) {
  try {
    const result = await this.dao.deleteById(id);

    if (!result || result[0] === 0) {
      throw new APIError("Product not found", 404);
    }

    return { id, status: "INACTIVE" };
  } catch (error: any) {
    throw new APIError(`Soft delete failed: ${error.message}`, 500);
  }
}


}