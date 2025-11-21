export interface IUser{
    id?:string;
    name:string;
    email:string;
    phone:string;
    otp?:string;
    password?: string; 
    isEmailVerified?:boolean;
    isPhoneVerified?:boolean;
    createdAt?:Date;
    updatedAt?:Date
}
