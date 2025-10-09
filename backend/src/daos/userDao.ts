import { Op } from 'sequelize';
import { User } from '../models/User.ts';
import type{ IUser } from '../interfaces/IUser.ts';

export default class UserDao {
    public static async createUser(data: { name: string, email: string, phone: string }) {
        try {

            const user = await User.create(data);
            // ✅ Sequelize ka actual data ye hai
            return user.toJSON();
        } catch (error) {
            throw error;

        }

    }

    public static async getUserByEmail(email: string) { //can by phone for verification
        try {
            const userEmail = await User.findOne({ where: { email }, raw: true });
            console.log('emaildao', userEmail)
            return userEmail
        } catch (error) {
            throw error

        }
    }

    public static async findUserByEmailOrPhone(data: { email: string, phone: string }): Promise<User | null> {
        try {
            const existingUser = await User.findOne({
                where: {
                    [Op.or]: [
                        { email: data.email },
                        { phone: data.phone }
                    ]
                },
                raw: true
            });
            console.log('existingUSer', existingUser)
            return existingUser;

        } catch (error: any) {
            throw error;
            // throw new AppError(error.message || "Database Error", 500);
        }
    }
    public static async updateEmailVerification(userId: string, status: boolean) {
        try {
            await User.update({ isEmailVerified: status }, { where: { id: userId } });
        } catch (error) {
            throw error;
        }



    }

    public  async findUserById(userId:string){
        try {
            const user = await User.findByPk(userId);
            return user ? (user.toJSON() as IUser) : null;
            // return user;
        } catch (error:any) {
            throw new Error(error.message || 'Error in Creating USer DAO' || 500)
            
        }

    }

}