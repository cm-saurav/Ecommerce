import type {Request, Response, NextFunction} from 'express';



export const sendApiResponse = (res: Response, statusCode: number, data: any, message: string = 'success'): Response => {
    return res.status(statusCode).json({
        status: statusCode,
        message,
        data,
    });
}


export const slugify = (text: string):string=>{
    return text.toLowerCase().trim().replace(/ /g, "-").replace(/[^\w-]+/g, "")

}