import { mailer } from "../common/mailer.ts";

export default class OtpService {
  public static async sendOtpEmail(to: string, otp: string) {
    try {
      await mailer.sendMail({
        from: `process.env.EMAIL_USER`,
        to,
        subject: "Your OTP Code",
        text: `Your OTP is ${otp}`,
        html: `<h3>Your OTP is <b>${otp}</b></h3>`,
      });

      console.log(`OTP sent to ${to}`);
    } catch (error: any) {
      console.log("Error sending OTP email:", error.message);
      throw error;
    }
  }
}
