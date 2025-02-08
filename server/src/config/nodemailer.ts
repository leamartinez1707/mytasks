import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


dotenv.config();

const config = () => {
    return {
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true para 465, false para 587
        service: 'gmail',
        auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASSWORD },
    };
}
export const transporter = nodemailer.createTransport(config());