import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Auth, { IAuth } from '../models/Auth';

// Se utiliza interface para extender la interfaz Request de Express y agregar la propiedad user
declare global {
    namespace Express {
        interface Request {
            user?: IAuth;
        }
    }
}
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        res.status(401).json({ error: 'No autorizado' });
        return;
    }
    const token = bearer.split(' ')[1];
    // const [, token] = bearer.split(' ');
    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

        if (typeof tokenDecoded === 'object' && tokenDecoded.id) {
            const user = await Auth.findById(tokenDecoded.id).select('_id name email')
            if (!user) {
                res.status(400).json({ error: 'Token no valido' });
                return;
            } else {
                req.user = user;
            }
        }


    } catch (error) {
        res.status(400).json({ error: 'Token no valido' });
        return;

    }
    next();
}