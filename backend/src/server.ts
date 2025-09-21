
// app file ko import karaga then usa app ko listen karaga 
// db initilize karaga


import express from 'express';
import { config } from 'dotenv';
import sequelize from "./commons/dbConfig.ts"
config()

console.log(sequelize.config.password)
console.log(sequelize.config.database)
console.log(sequelize.config.host)
console.log(sequelize.config.username)
console.log(sequelize.config.port)

// console.log('passtype:',typeof(process.env.DB_PASSWORD) ,'pass:',process.env.DB_PASSWORD,'port',process.env.DB_PORT)
import type {Request, Response} from 'express';
const app = express();
const port = process.env.PORT

app.get('/',(req:Request, res: Response):any =>{
    res.send('hello')

})
// db connection check
try {
   await sequelize.authenticate();
   console.log("DB connected successfully")
} catch (error) {
  console.error("DB connection failed:", error)
}

app.listen(port,()=>{
    console.log(`server is listining at port ${port}`)
})