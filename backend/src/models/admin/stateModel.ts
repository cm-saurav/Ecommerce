import { Model, DataTypes,  } from "sequelize";
import type { Optional } from "sequelize";
import sequelize from "../../common/dbConfig.js";
import  {  StateStatus } from "../../interfaces/admin/IState.js";
import type { IState } from "../../interfaces/admin/IState.js";

export interface StateCreationAttr extends Optional<IState, "id" | "status"> {}

export class StateModel extends Model<IState, StateCreationAttr> implements IState {
    declare id: string;
    declare name: string;
    declare code: string;
    declare status: StateStatus;
    declare readonly created_at: Date;
    declare readonly updated_at: Date;
}

StateModel.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique:true
        },
        code: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true,
        },
        status: {
            type: DataTypes.ENUM(...Object.values(StateStatus)),
            allowNull: false,
            defaultValue: StateStatus.ACTIVE,
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
        tableName: "states",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);
