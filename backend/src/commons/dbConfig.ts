import { Sequelize } from "sequelize";
import { config } from "dotenv";
config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME! ,
  username: process.env.DB_USER! ,
  password: String(process.env.DB_PASSWORD  ?? ""),
  port: parseInt(process.env.DB_PORT || "5432"),
  host: process.env.DB_HOST!,
  dialect: "postgres",
   dialectOptions: {
    ssl: false,
  },
});



export default sequelize;
