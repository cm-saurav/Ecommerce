import { CategoryModel } from "../models/admin/categoryModel.ts";
import { ProductModel } from "../models/admin/productModel.ts";
import { StateModel } from "../models/admin/stateModel.ts";
import { CityModel } from "../models/admin/cityModel.ts";
import { PincodeModel } from "../models/admin/pincodeModel.ts";
export const setupAssociations = () => {
  
  // Category 1 ----> Many Products
  CategoryModel.hasMany(ProductModel, {
    foreignKey: "category_id",
    as: "products",
    onDelete: "CASCADE",
  });

  ProductModel.belongsTo(CategoryModel, {
    foreignKey: "category_id",
    as: "category",
  });

  /////////////////////////////// city : pin and state

  StateModel.hasMany(CityModel, {
        foreignKey: "state_id",
        as: "cities",
        onDelete: "CASCADE",
    });
    CityModel.belongsTo(StateModel, {
        foreignKey: "state_id",
        as: "state",
    });

    // City -> Pincodes
    CityModel.hasMany(PincodeModel, {
        foreignKey: "city_id",
        as: "pincodes",
        onDelete: "CASCADE",
    });
    PincodeModel.belongsTo(CityModel, {
        foreignKey: "city_id",
        as: "city",
    });
};
