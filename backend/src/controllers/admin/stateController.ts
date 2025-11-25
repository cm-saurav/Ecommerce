import type { Request, Response, NextFunction } from "express";
import { StateService } from "../../services/admin/stateServices.js";
import { sendApiResponse } from "../../utils/helper.ts";

export class StateController {
  constructor(private service: StateService) {
    this.service = service;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;

      if (!payload.name) {
        return sendApiResponse(res, 400, {}, "name is required");
      }
      payload.name = payload.name.trim().toLowerCase();
      payload.code = payload.code.trim().toUpperCase();

      const state = await this.service.create(payload);

      return sendApiResponse(res, 201, state, "State created successfully");
    } catch (error: any) {
     next(error)
    }
  }
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const states = await this.service.getAll();

      return sendApiResponse(res, 200, states, "All states fetched successfully");
    } catch (error) {
      next(error);
    }
  }

  
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const payload = req.body;

      if (!payload.name && !payload.code) {
        return sendApiResponse(res, 400, {}, "name or code required to update");
      }

      if (payload.name) payload.name = payload.name.trim().toLowerCase();
      if (payload.code) payload.code = payload.code.trim().toUpperCase();

      const updated = await this.service.update(id, payload);

      return sendApiResponse(res, 200, updated, "State updated successfully");
    } catch (error) {
      next(error);
    }
  }

  async softDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;

      const result = await this.service.softDelete(id);

      return sendApiResponse(res, 200, result, "State deleted (soft delete)");
    } catch (error) {
      next(error);
    }
  }

    async getById(req:Request, res:Response, next: NextFunction) {
    try {
      const id  = req.params.id as string;
      const state = await this.service.getById(id);

      if (!state) {
        return res.status(404).json({
          message: "State not found",
        });
      }

      return res.status(200).json({
        message: "State fetched successfully",
        data: state,
      });
    } catch (error) {
      return next(error)
    }
  }
}
