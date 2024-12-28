import { Request, Response } from "express";
import Auth from "../models/Auth";
import { comparePassword, hashPassword } from "../utils/auth";

export class ProfileController {

    static updateProfile = async (req: Request, res: Response) => {
        const { name, email } = req.body;

        const userExists = await Auth.findOne({ email });
        if (userExists && userExists.id.toString() !== req.user.id.toString()) {
            res.status(409).json({ error: "El email ya está en uso" });
            return;
        }

        req.user.name = name;
        req.user.email = email;

        try {

            await req.user.save();

            res.send('Perfil actualizado');
        } catch (error) {
            res.status(500).json({ error: "Error en el servidor" });

        }
    }

    static updatePassword = async (req: Request, res: Response) => {

        const { current_password, password } = req.body;

        const user = await Auth.findById(req.user.id);

        const isPasswordValid = await comparePassword(current_password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'La contraseña actual no es válida' });
            return;
        }

        try {
            user.password = await hashPassword(password);
            await user.save()
            res.send('Contraseña actualizada');
        } catch (error) {
            res.status(500).json({ error: "Error en el servidor" });
        }

    }

}