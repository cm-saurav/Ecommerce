import express from 'express';
import userRoute from './routes/userRoute.ts';
// import notificationRoute from './routes/notificationRoute.ts';
import { errorHandler } from './helpers/errorHandler.ts';
import { config } from 'dotenv';
config();




const app = express();
app.use(express.json());





// User Routes
app.use('/api',userRoute);
// app.use('/api/notification',notificationRoute)

//error handler always come at last 
 app.use(errorHandler);



export default app;
