import { transporter } from "../config/nodemailer";

interface IEmail {
    email: string,
    name: string,
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: IEmail) => {
        const info = await transporter.sendMail({
            from: "UpTask <admin@uptask.com>",
            to: user.email,
            subject: "UpTask - Confirma tu cuenta",
            text: "UpTask - Confirma tu cuenta",
            html: `
                <h1>UpTask</h1>
                <p>Hola ${user.name}, has creado tu cuenta en UpTask, solo falta confirmar tu cuenta!</p>
                <p>Para confirmar haz click en el siguiente enlace:</p>
                <a href="">Confirmar cuenta</a>
                <p>Ingresa el siguiente código: <b>${user.token}</b></p>
                <p>Este token expira en 10 minutos</p>
            `
        });
        console.log('mensaje enviado' + info.messageId);
    }
}