
// app file ko import karaga then usa app ko listen karaga 
// db initilize karaga


import express from 'express';

import type {Request, Response} from 'express';
const app = express();

app.get('/',(req:Request, res: Response):any =>{
    res.send('hello')

})



app.listen(3001,()=>{
    console.log(`server is listining at port 3001`)
})