import { Router } from "express";
import { body } from 'express-validator';
import { AuthController } from "../controllers/AuthController";
import { handleInputErrors } from "../middleware/validation";


const router = Router();


router.post("/register",
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    }),
    body('email').isEmail().withMessage('El email no es válido'),
    handleInputErrors,
    AuthController.createAccount);

router.post("/login", async (req, res) => {
    // code for register
});

export default router;