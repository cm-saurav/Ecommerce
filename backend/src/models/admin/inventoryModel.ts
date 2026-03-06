import { DataTypes, Model } from "sequelize";
import  sequelize  from "../../common/dbConfig.js";
import type{ IInventory } from "../../interfaces/admin/IInventory.ts";
import { InventoryStatus } from "../../interfaces/admin/IInventory.ts";


export class InventoryModel extends Model {}

InventoryModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    created_by: {
      type: DataTypes.UUID,
      allowNull: false,
    },

   status: {
       type: DataTypes.ENUM(...Object.values(InventoryStatus)),
       allowNull: false,
       defaultValue: InventoryStatus.ACTIVE,
    },

    last_restocked_at: {
      type: DataTypes.DATE,
      allowNull: true,
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
    tableName: "inventory",
    timestamps: false, // because manually tracking created_at, updated_at
  }
);
