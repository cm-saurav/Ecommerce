import { dbConnection,dbMigrate } from './common/dbConfig.ts';
import app from './app.ts';
import { User } from './models/User.ts';
// import { Otp } from './models/Otp.ts';


const port = process.env.PORT;
console.log('port',port)

process.on("unhandledRejection", (reason, promise) => {
  console.error("🚨 Unhandled Rejection:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("🚨 Uncaught Exception:", err);
  process.exit(1);
});


const startServer = async () => {
   try {
      app.listen(port, async () => {
         await dbConnection();
         await dbMigrate(); // every time migration run 
         console.log(`server is listning at port ${port}`)
      })
   } catch (error: any) {
      console.log(`error in starting Express server${error.message}`)

   }

}

startServer();