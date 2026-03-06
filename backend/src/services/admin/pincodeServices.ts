import { APIError } from "../../common/error.js";
import type { IPincode } from "../../interfaces/admin/IPincode.js";
import { PincodeDao } from "../../daos/admin/pincodeDao.js";
import { CityDao } from "../../daos/admin/cityDao.js";
import { validate as isUUID } from "uuid";

export class PincodeService {
  constructor(private dao: PincodeDao, private cityDao: CityDao) {
    this.dao = dao;
    this.cityDao = cityDao;
  }

  async create(payload: IPincode) {
    try {
      // Validate UUID
      if (!isUUID(payload.city_id!)) {
        throw new APIError("Invalid city_id format", 400);
      }

      // 1) Check city exists
      const city = await this.cityDao.getById(payload.city_id!);
      if (!city) throw new APIError("City not found", 400);

      // 2) Normalize pincode
      payload.pincode = payload.pincode!.trim();

      // 3) Duplicate check - same pincode under same city
      const exists = await this.dao.findByPincodeAndCity(
        payload.city_id!,
        payload.pincode!
      );
      if (exists)
        throw new APIError("Pincode already exists under this city", 400);

      // 4) Create record
      return await this.dao.create(payload);

    } catch (error: any) {
      if (error instanceof APIError) throw error;
      throw new APIError(`Failed to create pincode: ${error.message}`, 500);
    }
  }
  async getAll() {
  try {
    const pincodes = await this.dao.getAll();
    return pincodes;
  } catch (error: any) {
    throw new APIError(`Failed to fetch pincodes: ${error.message}`, 500);
  }
}

async getById(id: string) {
  try {
    if (!isUUID(id)) {
      throw new APIError("Invalid pincode id format", 400);
    }

    const pincode = await this.dao.findById(id);

    if (!pincode) {
      throw new APIError("Pincode not found", 404);
    }

    return pincode;

  } catch (error: any) {
    if (error instanceof APIError) throw error;
    throw new APIError(`Failed to fetch pincode: ${error.message}`, 500);
  }
}
async update(id: string, payload: Partial<IPincode>) {
  try {
    // Validate id
    if (!isUUID(id)) {
      throw new APIError("Invalid pincode ID format", 400);
    }

    // Check record exists
    const existing = await this.dao.findById(id);
    if (!existing) {
      throw new APIError("Pincode not found", 404);
    }

    // Normalize pincode if passed
    if (payload.pincode) {
      payload.pincode = payload.pincode.trim();

      // Duplicate check: same city + same pincode
      const duplicate = await this.dao.findByPincodeAndCity(
        existing.city_id,
        payload.pincode
      );

      if (duplicate && duplicate.id !== id) {
        throw new APIError("Pincode already exists for this city", 400);
      }
    }

    // Update
    await this.dao.update(id, payload);

    return this.dao.findById(id);
  } catch (error: any) {
    if (error instanceof APIError) throw error;
    throw new APIError(`Failed to update pincode: ${error.message}`, 500);
  }
}

  async softDelete(id: string) {
    try {
      return await this.dao.softDelete(id);
    } catch (error) {
      throw error;
    }
  }

}
