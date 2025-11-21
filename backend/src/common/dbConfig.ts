import { Sequelize } from "sequelize";
import { config } from "dotenv";

config()

const sequelize = new Sequelize({
  username:process.env.DB_USER!,
  database:process.env.DATABASE!,
  password:process.env.PASSWORD!,
  host:process.env.HOST!,
  port:parseInt(process.env.DB_PORT ||""),
  dialect:'postgres',
  //logging:console.log, // it will show query of sql 
  logging:process.env.NODE_ENV === "development" ? false : false,
  // this will stop the sql query message once we get during dbMigtaion 
 
});

//test db configuration
export const dbConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log('db connected')
    } catch (error: any) {
        console.log('err', error.message)
    }
}

export const dbMigrate = async()=>{
    try {
        await sequelize.sync({alter:true}); // sync use in developemnet , for prod use 
        console.log('dbMigrated')

    } catch (error:any) {
        console.log(`error in dbMigrate ${error.message}`)
         process.exit(1);ServiceWorkerRegistration
    }
   
}

export default sequelize;


