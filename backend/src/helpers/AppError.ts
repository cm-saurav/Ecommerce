export class AppError extends Error{
    statusCode: number;
    constructor(message: string, statusCode: number){
        super(message);   //parent (Error) ka constructor call kar ra h
        this.statusCode = statusCode;
        Object.setPrototypeOf(this,AppError.prototype)
    }
}
