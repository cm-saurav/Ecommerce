import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import UserService from '../services/userServices.ts';

export default class UserController {
    public static async addUser(req: Request, res: Response, next: NextFunction) {
        const { name, phone, email } = req.body;
        try {
            if (!name || !phone || !email) {
                return res.status(400).json({ message: "Name, email and phone are required" });
            }
            const result = await UserService.addUser({ name, email, phone });
        
            return res.status(201).json({ message: "User added successfully", data: result });
        } catch (error: any) {
            next(error);

        }

    }

    // otp verification
    public static async verifyOtp(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }
        try {
            const verified = await UserService.verifyOtp(email, otp);
            if (!verified) {
                return res.status(400).json({ message: "Invalid OTP" });
            }

            return res.status(200).json({ message: "OTP verified successfully" });


        } catch (error: any) {
            console.error(` error in verifying otp ${error.message}`);
          next(error);



        }
    }
}