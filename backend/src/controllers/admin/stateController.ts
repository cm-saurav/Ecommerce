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
}
