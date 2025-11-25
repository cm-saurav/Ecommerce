import { StateDao } from "../../daos/admin/stateDao.ts";
import type { IState } from "../../interfaces/admin/IState.ts";
import { APIError } from "../../common/error.ts";

export class StateService {
  constructor(private dao: StateDao) {
    this.dao = dao;
  }

  async create(payload: IState) {
    try {

      const existingState = await this.dao.findByName(payload.name!);
      if (existingState) {
        throw new APIError("State already exists", 400);
      }
      if (payload.code) {
        const existingCode = await this.dao.findByCode(payload.code);
        if (existingCode) throw new APIError("State code already exists", 400);
      }

      return await this.dao.create(payload);
    } catch (error: any) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Error in creating state: ${error.message}`, 500);
    }

  }
  
   async getAll(): Promise<IState[]> {
    try {
      return await this.dao.getAll();
    } catch (error: any) {
      throw new APIError(`Failed to fetch states: ${error.message}`, 500);
    }
  }

  async update(id: string, payload: IState) {
    try {
      const state = await this.dao.findById(id);
      if (!state) throw new APIError("State not found", 404);

      if (payload.name) {
        payload.name = payload.name.trim().toLowerCase();
        const existing = await this.dao.findByName(payload.name);
        if (existing && existing.id !== id) {
          throw new APIError("State name already exists", 400);
        }
      }

      if (payload.code) {
        payload.code = payload.code.trim().toUpperCase();
        const existingCode = await this.dao.findByCode(payload.code);
        if (existingCode && existingCode.id !== id) {
          throw new APIError("State code already exists", 400);
        }
      }

      return await this.dao.updateState(id, payload);
    } catch (error: any) {
      if (error instanceof APIError) throw error;
      throw new APIError(`Error updating state: ${error.message}`, 500);
    }
  }

  async softDelete(id: string) {
    try {
      const state = await this.dao.findById(id);
      if (!state) throw new APIError("State not found", 404);

      return await this.dao.softDelete(id);
    } catch (error: any) {
      if (error instanceof APIError) throw error;
      throw new APIError(`Error deleting state: ${error.message}`, 500);
    }
  }
  async getById(id: string) {
    try {
      // return await this.dao.getById(id);
      return await this.dao.findById(id)
    } catch (error) {
      throw error;
    }
  }
}