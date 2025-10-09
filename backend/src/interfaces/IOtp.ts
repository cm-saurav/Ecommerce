export interface IOtp{
    id?:string;  // makje it optional here becoz 
    userId: string;
    otp:string;
    expiresAt: Date;
    createdAt?: Date;
    updatedAt?: Date;
}