interface User{
    id: string;
    phone:string;
    email?:string;
    otp?:string;
    isVerified: boolean;
    createdAt:Date;
    updatedAt: Date;

}

