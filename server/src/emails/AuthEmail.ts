import { transporter } from "../config/nodemailer";
import { confirmUserEmailTemplate, resetPasswordEmailTemplate } from "./emailTemplate";


interface IEmail {
    email: string,
    name: string,
    token: string
}

const sendOrThrow = async (mailOptions: {
    from: string | undefined;
    to: string;
    subject: string;
    text: string;
    html: string;
}) => {
    const result = await transporter.sendMail(mailOptions);

    if (result.rejected.length > 0 || result.accepted.length === 0) {
        throw new Error(`No se pudo enviar el email a ${mailOptions.to}`);
    }

    return result;
};

export class AuthEmail {
    static sendConfirmationEmail = async (user: IEmail) => {
        try {
            await sendOrThrow({
                from: process.env.MAIL_USER,
                to: user.email,
                subject: "Taskbyte - Confirma tu cuenta",
                text: "Taskbyte - Confirma tu cuenta",
                html: confirmUserEmailTemplate(user),
            });
        } catch (error) {
            console.log('Error al enviar email de confirmacion:', error);
            throw error;
        }

    }
    static sendPasswordResetToken = async (user: IEmail) => {
        try {
            await sendOrThrow({
                from: process.env.MAIL_USER,
                to: user.email,
                subject: "Taskbyte - Restablecer contraseña",
                text: "Taskbyte - Restablecer contraseña",
                html: resetPasswordEmailTemplate(user),
            });
        } catch (error) {
            console.log('Error al enviar email de reset:', error);
            throw error;
        }
    }
}