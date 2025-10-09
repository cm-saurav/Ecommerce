// import dao -> UserDao
//import interface and all models 

import UserDao from "../daos/userDao.ts";
import OtpDao from "../daos/otpDao.ts";
import { otpGenerator } from "../helpers/GenerateOtp.ts";
import OtpService from "./mailServices.ts";
import { AppError } from "../helpers/AppError.ts";
export default class UserService {
    public static async addUser(userData: { name: string, phone: string, email: string }) {

        try {
            // todo: check email exist so user is =laos exist return message to user 
            const existingUser = await UserDao.findUserByEmailOrPhone(userData);
            if (existingUser) {
                if (existingUser.isEmailVerified) {
                    throw new AppError('User already registered and verified', 409) // throw error with 2 params -> mesg and ststudcode
                }
                const otp = otpGenerator();
                await OtpDao.saveOtp({ userId: existingUser.id, otp });
                console.log(`Resent OTP for ${existingUser.email}: ${otp}`);
                await OtpService.sendOtpEmail(existingUser.email, otp)
                return { user: existingUser, message: "OTP resent successfully" };


            }
            // for newly comer user
            const user = await UserDao.createUser(userData);
            if (!user?.id) throw new AppError("Failed to create user — no id returned", 409);

            const otp = otpGenerator();
            await OtpDao.saveOtp({ userId: user.id, otp });
            await OtpService.sendOtpEmail(user.email, otp);

            return { user, message: "User registered successfully, OTP sent" };

        } catch (error: any) {
             if(error instanceof AppError) throw error
            throw new AppError(error.message || "Service Error", 500);

        }

    }

    // otp verification
    public static async verifyOtp(email: string, otp: string) {
        try {
            // getuserBy enmail function 
            const user = await UserDao.getUserByEmail(email);
            if (!user) throw new AppError("User not found",401);

            const valid = await OtpDao.verifyOtp(user.id, otp);
            if (!valid) throw new AppError ("Invalid or expired OTP" , 400);
            // Update verification status
            await UserDao.updateEmailVerification(user.id, true);
            await OtpDao.deleteOtp(user.id);
            return { success: true, message: "Email verified successfully" };
        }
        catch (error: any) {
            throw new AppError(error.message || 'Error in verify Otp',500)

            // console.log('error in verify otp', error.message)
           
        }
    }
}