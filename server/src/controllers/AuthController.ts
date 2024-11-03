import type { Request, Response } from "express"
import { hashPassword } from "../utils/auth";
import Auth from "../models/Auth";
import Token from "../models/Token";
import { generateToken } from "../utils/token";

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {

        try {
            const { password, email } = req.body;
            const user = new Auth(req.body);

            const emailExists = await Auth.findOne({ email });
            if (emailExists) {

                res.status(409).json({ error: "El email ya está en uso" });
                return;
            }
            user.password = await hashPassword(password);

            //General el token
            const token = new Token();
            token.token = generateToken();
            token.user = user.id;

            await Promise.allSettled([user.save(), token.save()]);
            
            res.send("Cuenta creada, revisa tu email para confirmarla");
        } catch (error) {
            res.status(500).json({ error: "Error en el servidor" });
        }
    }

}