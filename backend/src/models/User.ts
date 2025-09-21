import {DataTypes,Model, UUID,} from 'sequelize';
import sequelize from '../commons/dbConfig.ts';
 

class User extends Model{}
User.init({
    id:{type: DataTypes.UUID, defaultValue:DataTypes.UUIDV4, primaryKey:true},
    email:{type: DataTypes.STRING, allowNull:true},
    phone:{type:DataTypes.STRING, allowNull: false, unique: true},
    isVerified:{type:DataTypes.BOOLEAN, defaultValue:false}


},{sequelize,modelName:"user"});

class OtpVerification extends Model{}
OtpVerification.init({
    id:{type:DataTypes.UUID, defaultValue:DataTypes.UUIDV4, primaryKey:true},
    phone:{type:DataTypes.STRING, allowNull:false,unique:true},
    otp:{type:DataTypes.STRING, allowNull:false}, // varchar is safer than int leading 0 also 
    expiresAt:{type:DataTypes.DATE, allowNull:false}

},{sequelize, modelName:""})