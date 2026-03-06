import { CityDao } from "../../daos/admin/cityDao.js";
import { StateDao } from "../../daos/admin/stateDao.js";
import type { ICity } from "../../interfaces/admin/ICity.js";
import { APIError } from "../../common/error.js";
import {validate as isUUID} from 'uuid';
import { CityStatus } from "../../interfaces/admin/ICity.js";

export class CityService {
  constructor(private dao: CityDao, private stateDao: StateDao) {
    this.dao = dao;
    this.stateDao = stateDao;
  }

  async create(payload: ICity) {
    try {
      // 1) Check state exists
      const state = await this.stateDao.findById(payload.state_id);
      if (!state) throw new APIError("Invalid state_id. State not found", 400);

      // 2) normalize
      payload.name = payload.name.trim().toLowerCase();
      payload.city_code = payload.city_code.trim().toUpperCase();

      // 3) Duplicate check name + state
      const existingCity = await this.dao.findByNameAndState(
        payload.state_id,
        payload.name
      );
      if (existingCity)
        throw new APIError("City already exists under this state", 400);

      // 4) Duplicate city_code + state
      const existingCode = await this.dao.findByCodeAndState(
        payload.state_id,
        payload.city_code
      );
      if (existingCode)
        throw new APIError("City code already exists under this state", 400);

      // 5) Create
      return await this.dao.create(payload);

    } catch (error: any) {
      if (error instanceof APIError) throw error;
      throw new APIError(`Error creating city: ${error.message}`, 500);
    }
  }
   async getAll() {
    try {
      const cities = await this.dao.getAll();
      return cities;
    } catch (error: any) {
      throw new APIError(`Failed to fetch cities: ${error.message}`, 500);
    }
  }

    async getById(id: string) {
    try {
         if (!isUUID(id)) {
       throw new APIError("Invalid city id format", 400);
    }
      const city = await this.dao.getById(id);
      if(!city){
        throw new APIError('city is not found', 400);
      }
      return city;
    } catch (error: any) {
      throw new APIError(`Failed to fetch cities: ${error.message}`, 500);
    }
  }
  async update(id: string, payload: Partial<ICity>) {
  try {
    // Validate UUID
    if (!isUUID(id)) {
      throw new APIError("Invalid city id format", 400);
    }

    // Fetch existing city
    const existingCity = await this.dao.getById(id);
    if (!existingCity) {
      throw new APIError("City not found", 404);
    }

    if (payload.name || payload.state_id) {
      const conflict = await this.dao.findByNameAndState(
          payload.state_id ?? existingCity.state_id,
        payload.name ?? existingCity.name,
      
      );

      if (conflict && conflict.id !== id) {
        throw new APIError("City with this name already exists in selected state", 400);
      }
    }

    if (payload.city_code || payload.state_id) {
      const conflictCode = await this.dao.findByCodeAndState(
         payload.state_id ?? existingCity.state_id,
        payload.city_code ?? existingCity.city_code,
       
      );

      if (conflictCode && conflictCode.id !== id) {
        throw new APIError("City code already exists in this state", 400);
      }
    }

    const updated = await this.dao.update(id, payload);
    return updated;

  } catch (error: any) {
    throw new APIError(`Failed to update city: ${error.message}`, 500);
  }
}

async softDelete(id: string) {
  try {
    if (!isUUID(id)) {
      throw new APIError("Invalid city id format", 400);
    }

    const city = await this.dao.getById(id);
    if (!city) {
      throw new APIError("City not found", 404);
    }

    // Already inactive?
    if (city.status === CityStatus.INACTIVE) {
      throw new APIError("City is already inactive", 400);
    }

    const updatedCity = await this.dao.softDelete(id);

    return updatedCity;

  } catch (error: any) {
    throw new APIError(`Failed to soft delete city: ${error.message}`, 500);
  }
}


}
