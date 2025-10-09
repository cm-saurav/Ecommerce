import { Otp } from '../models/Otp.ts';
import { Op } from 'sequelize';
export default class OtpDao {
    public static async saveOtp(data: { userId: string, otp: string }) {
        try {
            // creating otp here 
            // add expiredsta time 

            if (!data.userId) {
                throw new Error("saveOtp: userId is required");
            }
            const saveOtp = await Otp.create({
                userId: data.userId,
                otp: data.otp,
                expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 min expiry
            });
            return saveOtp;
        } catch (error: any) {
            console.log(`error in  save otp ${error.message}`);

            throw error
        }

    }

    public static async verifyOtp(userId: string, otp: string) { //can by phone for verification
        try {
            // find by mail where id and opt are 
            console.log('userId', userId, 'otp', otp)
            const record = await Otp.findOne({
                where: {
                    userId,
                    otp,
                    expiresAt: {
                        [Op.gt]: new Date(),

                    } // not expired
                }
            });
            console.log('recordddd', record)
            return !!record; // otp valid hone pr true chahiye 
        }
        catch (error: any) {
            throw error;
        }

    }
    public static async deleteOtp(userId: string) {
        try {
            await Otp.destroy({
                where: { userId }
            });
        } catch (error) {
            throw error;
        }
    }

}