import { CategoryModel } from "../models/admin/categoryModel.ts";
import { ProductModel } from "../models/admin/productModel.ts";

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
};
