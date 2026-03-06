// global error handler
// catch all error via next(error) and send structured response 
import type { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError.ts";

// ervices and dao : wit respect it will throw error 

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("🔥 Error caught:", err);
  if(err instanceof AppError){
   return res.status(err.statusCode).json({
    success: false,
   message: err.message
  });
}

 return res.status(500).json({
        success: false,
        message: "Internal Server Error from Backend side",
    });
};
