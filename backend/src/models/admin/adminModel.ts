// // src/models/admin/adminModel.ts

// import { DataTypes, Model } from "sequelize";
// // import { sequelize } from "../../configs/db.js";

// export class AdminModel extends Model {}

// AdminModel.init(
//   {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//     },

//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },

//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },

//     password: {
//       type: DataTypes.STRING,
//       allowNull: false, // hased password
//     },

//     role: {
//       type: DataTypes.ENUM("super_admin", "admin"),
//       defaultValue: "admin",
//     },

//     status: {
//       type: DataTypes.ENUM("active", "inactive"),
//       defaultValue: "active",
//     },

//     created_at: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },

//     updated_at: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//   },
// //   {
// //     // sequelize,
// //     tableName: "admin_users",
// //     timestamps: false,
// //   }
// );
