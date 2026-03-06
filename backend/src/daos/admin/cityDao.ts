import { CityModel } from "../../models/admin/cityModel.js";
import type { ICity } from "../../interfaces/admin/ICity.js";
import { StateModel } from "../../models/admin/stateModel.ts";

export class CityDao {
  
  async create(payload: ICity) {
    try {
      return await CityModel.create(payload);
    } catch (error) {
      throw error;
    }
  }

  async findByNameAndState(state_id: string, name: string) {
    try {
      return await CityModel.findOne({ where: { state_id, name } });
    } catch (error) {
      throw error;
    }
  }

  async findByCodeAndState(state_id: string, city_code: string) {
    try {
      return await CityModel.findOne({ where: { state_id, city_code } });
    } catch (error) {
      throw error;
    }
  }

    async getAll() {
    try {
      return await CityModel.findAll({
        include: [
          {
            model: StateModel,
            as: "state",
            attributes: ["id", "name", "code", "status"],
          },
        ],
        order: [["created_at", "DESC"]],
      });
    } catch (error) {
      throw error;
    }
  }

   async getById(id: string) {
  try {
    const city = await CityModel.findOne({
      where: {
        id,
      },
      attributes: [
        "id",
        "name",
        "city_code",
        "state_id",
        "created_at"
      ]
    });

    return city;
  } catch (error) {
    throw error;
  }
}

}
