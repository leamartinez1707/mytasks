import { Router } from 'express';
import { ProfileController } from '../controllers/ProfileController'
import { body } from 'express-validator';
import { authenticate } from '../middleware/auth'
import { handleInputErrors } from '../middleware/validation';


const router = Router();



router.put('/update',
    authenticate,
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('email').isEmail().withMessage('El email no es válido'),
    handleInputErrors,
    ProfileController.updateProfile)

router.post('/update-password', authenticate,
    body('current_password').notEmpty().withMessage('La contraseña actual es requerida'),
    body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    }),
    handleInputErrors,
    ProfileController.updatePassword)

export default router;