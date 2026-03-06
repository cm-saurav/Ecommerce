import { Model, DataTypes } from "sequelize";
import type { Optional } from "sequelize";
import sequelize from "../../common/dbConfig.js";
import type { ICity } from "../../interfaces/admin/ICity.ts";
import { CityStatus } from "../../interfaces/admin/ICity.ts";

export interface CityCreationAttr extends Optional<ICity, "id" | "status"> {}

export class CityModel extends Model<ICity, CityCreationAttr> implements ICity {
    declare id: string;
    declare name: string;
    declare state_id: string;
    declare status: CityStatus;
    declare readonly created_at: Date;
    declare readonly updated_at: Date;
}

CityModel.init(
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
        state_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(...Object.values(CityStatus)),
            allowNull: false,
            defaultValue: CityStatus.ACTIVE,
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
        tableName: "cities",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);
