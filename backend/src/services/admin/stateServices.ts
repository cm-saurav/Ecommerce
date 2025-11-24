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
}
