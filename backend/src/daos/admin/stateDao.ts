
import { StateModel } from "../../models/admin/stateModel.js";
import type { IState } from "../../interfaces/admin/IState.js";
import { StateStatus } from "../../interfaces/admin/IState.js";

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

   async getAll() {
    try {
      return await StateModel.findAll({
        order: [["created_at", "DESC"]],
      });
    } catch (error) {
      throw error;
    }
  }
  async findById(id: string) {
    try {
      return await StateModel.findByPk(id);
    } catch (error) {
      throw error;
    }
  }

   async updateState(id: string, payload: any) {
    try {
      const state = await StateModel.findByPk(id);
      if (!state) return null;

      await state.update(payload);
      return state;
    } catch (error) {
      throw error;
    }
  }

    async softDelete(id: string) {
    try {
      const state = await StateModel.findByPk(id);
      if (!state) return null;

      await state.update({ status: StateStatus.INACTIVE });

      return state;
    } catch (error) {
      throw error;
    }
  }

  //  async getById(id: string) {
  //   try {
  //     return await StateModel.findByPk(id);
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
