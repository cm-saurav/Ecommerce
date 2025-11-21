// src/models/admin/categoryModel.ts

import  { Model, DataTypes } from "sequelize";
import type { Optional } from "sequelize";
import sequelize from "../../common/dbConfig.js";
import type { ICategory } from "../../interfaces/admin/ICategory.js";
import { CategoryStatus } from "../../interfaces/admin/ICategory.js";

export interface CategoryCreationAttributes extends Optional<ICategory, "id" | "slug" | "status"> {}

export class CategoryModel extends Model<ICategory, CategoryCreationAttributes> {}
//     public id!: string;
//     public name!: string;
//     public slug!: string;
//     public status!: CategoryStatus;
//     public description!: string;
//     public readonly created_at!: Date;
//     public readonly updated_at!: Date;
// }

CategoryModel.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        status: {
            type: DataTypes.ENUM(...Object.values(CategoryStatus)),
            allowNull: false,
            defaultValue: CategoryStatus.ACTIVE,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        sequelize,
        tableName: "categories",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
);
