import type { Request, Response, NextFunction } from "express";
import { CityService } from "../../services/admin/cityServices.ts";
import { sendApiResponse } from "../../utils/helper.js";


export class CityController {
  constructor(private service: CityService) {
    this.service = service;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;

      if (!payload.state_id) {
        return sendApiResponse(res, 400, {}, "state_id is required");
      }
      if (!payload.name) {
        return sendApiResponse(res, 400, {}, "city name is required");
      }
      if (!payload.city_code) {
        return sendApiResponse(res, 400, {}, "city_code is required");
      }

      const city = await this.service.create(payload);

      return sendApiResponse(res, 201, city, "City created successfully");
    } catch (error) {
      next(error);
    }
  }

   async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const cities = await this.service.getAll();
      return sendApiResponse(res, 200, cities, "City list fetched successfully");
    } catch (error) {
      next(error);
    }
  }
   async getById(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id as string;
      const cities = await this.service.getById(id);
      return sendApiResponse(res, 200, cities, "City  fetched successfully by id");
    } catch (error) {
      next(error);
    }
  }
}
