import { Model, DataTypes } from "sequelize";
import type { Optional } from "sequelize";
import sequelize from "../../common/dbConfig.js";
import type { IProduct } from "../../interfaces/admin/IProduct.js";
import { ProductStatus } from "../../interfaces/admin/IProduct.js";

export interface ProductCreationAttr 
    extends Optional<IProduct, "id" | "status" | "discount_percentage"> {}

export class ProductModel extends Model<IProduct, ProductCreationAttr> {}

ProductModel.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        category_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        mrp_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        sale_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        discount_percentage: {
            type: DataTypes.DECIMAL(5, 2),
            defaultValue: 0,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        sku: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        stock_available: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        hsn_code: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM(...Object.values(ProductStatus)),
            defaultValue: ProductStatus.ACTIVE,
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
        tableName: "products",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);
