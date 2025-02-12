import { Router } from "express";
import { body, param } from 'express-validator';
import { AuthController } from "../controllers/AuthController";
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";


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

router.post("/confirm-account",
    body('token').notEmpty().withMessage('El token no puede estar vacío'),
    handleInputErrors,
    AuthController.confirmAccount
);
router.post("/login",
    body('email').isEmail().withMessage('E-mail no válido'),
    body('password').notEmpty().withMessage('La contraseña no puede estar vacía'),
    handleInputErrors,
    AuthController.login
);
router.post("/request-code",
    body('email').isEmail().withMessage('E-mail no válido'),
    handleInputErrors,
    AuthController.requestConfirmationCode
);
router.post("/forgot-password",
    body('email').isEmail().withMessage('E-mail no válido'),
    handleInputErrors,
    AuthController.requestNewPassword
);

router.post('/validate-token',
    body('token').notEmpty().withMessage('El token no puede estar vacío'),
    handleInputErrors,
    AuthController.validateToken
)
router.post('/update-password/:token',
    param('token').isNumeric().withMessage('El token no es válido'),
    body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    }),
    handleInputErrors,
    AuthController.updatePasswordWithToken
)
router.get('/user',
    authenticate,
    AuthController.userData)

router.post('/check-password',
    authenticate,
    body('password').notEmpty().withMessage('La contraseña no puede estar vacía'),
    handleInputErrors,
    AuthController.checkPassword
)
export default router;