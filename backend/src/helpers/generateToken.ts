import { config } from "dotenv";
import jwt from 'jsonwebtoken';
config();
const JWT_SECRET=process.env.JWT_SECRET as string;
const EXPIRES_IN= process.env.EXPIRES_IN as String;

export const generateToken = (payloads:{id:number, email:string})=>{
  return jwt.sign(payloads, JWT_SECRET,{expiresIn:EXPIRES_IN})


}