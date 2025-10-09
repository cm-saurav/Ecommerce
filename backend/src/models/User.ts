import sequelize from "../common/dbConfig.ts";
import { DataTypes, Model, UUID, UUIDV4 } from "sequelize";
import type { IUser } from "../interfaces/IUser.ts";




export class User extends Model<IUser> implements IUser{
    public id!: string;   // mandatory field
    public name!: string;
    public email!: string;
    public phone!: string;
    public isEmailVerified!: boolean;
    public isPhoneVerified!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


User.init({
    id:{type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey:true},
    name:{type:DataTypes.STRING, allowNull:false},
    email:{type: DataTypes.STRING, allowNull: false, unique: true},
    phone:{type:DataTypes.STRING, allowNull: false, unique: true},
    password:{type:DataTypes.STRING, allowNull:true},
    isEmailVerified: {type: DataTypes.BOOLEAN, defaultValue: false},
    isPhoneVerified: {type: DataTypes.BOOLEAN, defaultValue: false},
},{sequelize,modelName:'User', tableName: 'users', timestamps:true})