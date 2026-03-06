import { Model, DataTypes } from "sequelize";
import type { Optional } from "sequelize";
import sequelize from "../../common/dbConfig.js";
import type { IPincode } from "../../interfaces/admin/IPincode.ts";
import { PincodeStatus } from "../../interfaces/admin/IPincode.ts";

export interface PincodeCreationAttr extends Optional<IPincode, "id" | "status" | "delivery_available" | "area_name"> {}

export class PincodeModel extends Model<IPincode, PincodeCreationAttr> implements IPincode {
    declare id: string;
    declare city_id: string;
    declare pincode: string;
    declare area_name?: string;
    declare delivery_available: boolean;
    declare status: PincodeStatus;
    declare readonly created_at: Date;
    declare readonly updated_at: Date;
}

PincodeModel.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        city_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        pincode: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        area_name: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        delivery_available: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        status: {
            type: DataTypes.ENUM(...Object.values(PincodeStatus)),
            allowNull: false,
            defaultValue: PincodeStatus.ACTIVE,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: "pincodes",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);
