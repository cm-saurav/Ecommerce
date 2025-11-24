
import { StateModel } from "../../models/admin/stateModel.js";
import type { IState } from "../../interfaces/admin/IState.js";

export class StateDao {
  async create(payload: IState) {
    try {
      return await StateModel.create(payload);
    } catch (error) {
      throw error;
    }
  }

  async findByName(name: string) {
    try {
      return await StateModel.findOne({ where: { name } });
    } catch (error) {
      throw error;
    }
  }

  async findByCode(code: string) {
    try {
      return await StateModel.findOne({ where: { code } });
    } catch (error) {
      throw error;
    }
  }
}
