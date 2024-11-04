import type { Request, Response } from "express"
import { comparePassword, hashPassword } from "../utils/auth";
import Auth from "../models/Auth";
import Token from "../models/Token";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {

        try {
            const { password, email } = req.body;
            const user = new Auth(req.body);

            // Verificar si el email ya existe
            const emailExists = await Auth.findOne({ email });
            if (emailExists) {

                res.status(409).json({ error: "El email ya está en uso" });
                return;
            }

            // Hashear la contraseña
            user.password = await hashPassword(password);

            // Generar el token
            const token = new Token();
            token.token = generateToken();
            token.user = user.id;

            // Enviar email de confirmación
            await AuthEmail.sendConfirmationEmail({ email: user.email, name: user.name, token: token.token });

            await Promise.allSettled([user.save(), token.save()]);

            res.send("Cuenta creada, revisa tu email para confirmarla");
        } catch (error) {
            res.status(500).json({ error: "Error en el servidor" });
        }
    }

    static confirmAccount = async (req: Request, res: Response) => {

        try {
            const { token } = req.body;

            const tokenExists = await Token.findOne({ token });
            if (!tokenExists) {
                res.status(401).json({ error: "Token inválido" });
                return;
            }

            const user = await Auth.findById(tokenExists.user);
            user.confirmed = true;

            await Promise.allSettled([user.save(), tokenExists.deleteOne()]);

            res.send("Cuenta confirmada correctamente");
        } catch (error) {
            res.status(500).json({ error: "Error en el servidor" });
        }
    }

    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const user = await Auth.findOne({ email });
            if (!user) {
                res.status(404).json({ error: "Usuario no encontrado" });
                return;
            }
            if (!user.confirmed) {
                const token = new Token();
                token.user = user.id;
                token.token = generateToken();
                await token.save()
                // Enviar email de confirmación
                await AuthEmail.sendConfirmationEmail({ email: user.email, name: user.name, token: token.token });
                res.status(401).json({ error: "La cuenta no ha sido confirmada, te reenviamos un nuevo código de confirmación. Verifica tu email." });
                return;
            }
            // Verificar la contraseña
            const isValidPassword = await comparePassword(password, user.password);
            if (!isValidPassword) {
                res.status(401).json({ error: "Contraseña incorrecta" });
                return;
            }
            res.send('Autenticado correctamente');
        } catch (error) {
            res.status(500).json({ error: "Error en el servidor" });
        }
    }
}