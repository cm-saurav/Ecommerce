import sequelize from "../common/dbConfig.ts";
import { DataTypes, Model } from "sequelize";
import { User } from "./User.ts";
import type { IOtp } from "../interfaces/IOtp.ts";

export class Otp extends Model<IOtp> implements IOtp {

    public id!: string;
    public otp!: string;
    public userId!: string;
    public expiresAt!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Otp.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    otp: { type: DataTypes.STRING, allowNull: false },
    expiresAt: { type: DataTypes.DATE, allowNull: false }



}, { sequelize, modelName: "Otp", tableName: "otps" })

User.hasMany(Otp, { foreignKey: "userId", onDelete: "CASCADE" });
Otp.belongsTo(User, { foreignKey: "userId" });
