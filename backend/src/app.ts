import express from 'express';
import userRoute from './routes/userRoute.ts';
import adminCategoryRoute from './routes/admin/adminRoute.ts'
import adminProductRoute from './routes/admin/adminRoute.js'
// import notificationRoute from './routes/notificationRoute.ts';
import { errorHandler } from './helpers/errorHandler.ts';
import { config } from 'dotenv';
config();




const app = express();
app.use(express.json());





// User Routes
app.use('/api',userRoute);

// app.use('/api/admin/auth', adminAuthRoute);
app.use('/api/admin', adminCategoryRoute);
app.use('/api/admin', adminProductRoute);
// app.use('/api/notification',notificationRoute)

//error handler always come at last 
 app.use(errorHandler);



export default app;
