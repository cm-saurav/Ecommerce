import type { Request, Response, NextFunction } from "express";
import { CategoryService } from "../../services/admin/categoryServices.ts";
import { sendApiResponse } from "../../utils/helper.ts";

export class CategoryController{
    
    constructor(private service: CategoryService){
        this.service = service;
    }

    async create(req: Request, res:Response, next: NextFunction): Promise<any>{
        const payloads = {
            name: req.body.name,
            description: req.body.description
        }

        try {

            if(!payloads.name){
                return sendApiResponse(res, 400, {}, 'name is required')
            }

            const data = await this.service.create(payloads);
            return  sendApiResponse(res, 201, data, 'adding category succesfully')
            
        } catch (error) {
            next(error)
        }
    }
     async getAll(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {

            const query = {
                page: Number(req.query.page) || 1,
                limit: Number(req.query.limit) || 10,
                search: req.query.search ? String(req.query.search) : ""
            }

            const data = await this.service.getAll(query);

            return sendApiResponse(res, 200, data, "categories fetched successfully");

        } catch (error) {
            next(error);
        }
    }
    async updateById(req:Request, res:Response, next:NextFunction):Promise<any>{
        try {
            const categoryId = req.params.id;
            const payload = req.body;
            if(!payload.name || !categoryId){
                return sendApiResponse(res,400,{},"category name and Id  required")
            }
            const data = await this.service.updateById(categoryId, payload);
            return sendApiResponse(res, 200, data, 'category updated successfully')
        } catch (error) {
            next(error)
        }
    }

      async deleteById(req:Request, res:Response, next:NextFunction):Promise<any>{
        try {
            const categoryId = req.params.id;
         
            if( !categoryId){
                return sendApiResponse(res,400,{},"category   Id  required")
            }
            const data = await this.service.deleteById(categoryId);
            return sendApiResponse(res, 200, data, 'category deleted successfully')
        } catch (error) {
            next(error)
        }
    }
}