import type { Request, Response, NextFunction } from "express";
import { PincodeService } from "../../services/admin/pincodeServices.js";
import { sendApiResponse } from "../../utils/helper.js";

export class PincodeController {
  constructor(private service: PincodeService) {
    this.service = service;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;

      if (!payload.city_id)
        return sendApiResponse(res, 400, {}, "city_id is required");

      if (!payload.pincode)
        return sendApiResponse(res, 400, {}, "pincode is required");

      const pincode = await this.service.create(payload);

      return sendApiResponse(res, 201, pincode, "Pincode created successfully");
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const list = await this.service.getAll();
    return sendApiResponse(res, 200, list, "Pincode list fetched successfully");
  } catch (error) {
    next(error);
  }
}
async getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;

    const pincode = await this.service.getById(id);

    return sendApiResponse(res, 200, pincode, "Pincode fetched successfully by id");
  } catch (error) {
    next(error);
  }
}
async update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const payload = req.body;

    if (!id) {
      return sendApiResponse(res, 400, {}, "ID is required");
    }

    // Ensure at least one field is passed
    if (
      !payload.pincode &&
      !payload.area_name &&
      payload.delivery_available === undefined &&
      !payload.status
    ) {
      return sendApiResponse(res, 400, {}, "Nothing to update");
    }

    const updated = await this.service.update(id, payload);

    return sendApiResponse(res, 200, updated, "Pincode updated successfully");
  } catch (error) {
    next(error);
  }
}

  async softDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;

      const result = await this.service.softDelete(id);

      return sendApiResponse(
        res,
        200,
        result,
        "Pincode soft deleted (status inactive) successfully"
      );
    } catch (error) {
      next(error);
    }
  }

}
