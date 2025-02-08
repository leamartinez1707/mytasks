import { transporter } from "../config/nodemailer";
import { confirmUserEmailTemplate, resetPasswordEmailTemplate } from "./emailTemplate";


interface IEmail {
    email: string,
    name: string,
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: IEmail) => {
        try {
            await transporter.sendMail({
                from: process.env.MAIL_USER,
                to: user.email,
                subject: "UpTask - Confirma tu cuenta",
                text: "UpTask - Confirma tu cuenta",
                html: confirmUserEmailTemplate(user),
            });
        } catch (error) {
            console.log(error);

        }

    }
    static sendPasswordResetToken = async (user: IEmail) => {
        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: user.email,
            subject: "UpTask - Rsstablecer contraseña",
            text: "UpTask - Rsstablecer contraseña",
            html: resetPasswordEmailTemplate(user),
        });
    }
}