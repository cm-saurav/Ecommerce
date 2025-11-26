import { PincodeModel } from "../../models/admin/pincodeModel.js";
import type { IPincode } from "../../interfaces/admin/IPincode.js";
import { PincodeStatus } from "../../interfaces/admin/IPincode.js";

export class PincodeDao {
  async create(payload: IPincode) {
    try {
      return await PincodeModel.create(payload);
    } catch (error) {
      throw error;
    }
  }

  async findByPincodeAndCity(city_id: string, pincode: string) {
    try {
      return await PincodeModel.findOne({
        where: { city_id, pincode }
      });
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      return await PincodeModel.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      return await PincodeModel.findAll({
        order: [["created_at", "DESC"]],
        include: [{ association: "city" }]
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, payload: Partial<IPincode>) {
  try {
    await PincodeModel.update(payload, { where: { id } });
    return this.findById(id);
  } catch (error) {
    throw error;
  }
}

  async softDelete(id: string) {
    try {
      const [affected] = await PincodeModel.update(
        { status: PincodeStatus.INACTIVE },
        { where: { id } }
      );

      if (affected === 0) {
        return null; // not found
      }

      return this.findById(id)
    } catch (error) {
      throw error;
    }
  }

}
