import type { Request,Response, NextFunction } from "express";
import { ProductService } from "../../services/admin/productServices.ts";
import { sendApiResponse } from "../../utils/helper.ts";

export class ProductController{
    
    constructor(private service: ProductService){
        this.service = service;
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = req.body;

            const requiredFields = ["name", "category_id", "mrp_price"];

            for (const field of requiredFields) {
                if (!payload[field]) {
                    return sendApiResponse(res, 400, {}, `${field} is required`);
                }
            }

            if (payload.sale_price && !payload.mrp_price) {
                return sendApiResponse(res, 400, {}, "mrp_price required if sale_price provided");
            }

            const product = await this.service.create(payload);

            return sendApiResponse(res, 201, product, "Product created successfully");

        } catch (error: any) {
            return sendApiResponse(res, 400, {}, error.message);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            const result = await this.service.getAll(page, limit);

            return sendApiResponse(res, 200, result, "Products fetched successfully");
        } catch (error: any) {
            next(error);
        }
    }
    async getById(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;

        if (!id) {
            return sendApiResponse(res, 400, {}, "Product id is required");
        }

        const product = await this.service.getById(id);

        return sendApiResponse(res, 200, product, "Product fetched successfully");

    } catch (error: any) {
        return sendApiResponse(res, 404, {}, error.message);
    }
}

async updateById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const data = req.body;

    const updated = await this.service.updateById(id, data);

    return res.json({
      status: 200,
      message: "Product updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}

async deleteById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "Product ID required" });
    }

    const result = await this.service.deleteById(id);

    return res.status(200).json({
      status: 200,
      message: "Product soft deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}



}
