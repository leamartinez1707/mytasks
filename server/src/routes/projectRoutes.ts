import { Router } from 'express';
import { body, param } from 'express-validator';
import { ProjectController } from '../controllers/ProjectController';
import { handleInputErrors } from '../middleware/validation';
import { TaskController } from '../controllers/TaskController';
import { validateProjectExists } from '../middleware/project';



const router = Router();

router.post('/',
    body('projectName').notEmpty().withMessage('El nombre del proyecto es requerido'),
    body('clientName').notEmpty().withMessage('El nombre del cliente es requerido'),
    body('description').notEmpty().withMessage('La descripción del proyecto es requerida'),
    handleInputErrors,
    ProjectController.createProject);


router.get('/', ProjectController.getAllProjects);

router.get('/:id',
    param('id').isMongoId().withMessage('El id del proyecto no es válido'),
    handleInputErrors,
    ProjectController.getProjectWithId);

router.put('/:id',
    body('projectName').notEmpty().withMessage('El nombre del proyecto es requerido'),
    body('clientName').notEmpty().withMessage('El nombre del cliente es requerido'),
    body('description').notEmpty().withMessage('La descripción del proyecto es requerida'),
    handleInputErrors,
    ProjectController.updateProject);

router.delete('/:id',
    param('id').isMongoId().withMessage('El id del proyecto no es válido'),
    handleInputErrors,
    ProjectController.deleteProject);

// Rutas para las tareas

router.post('/:projectId/tasks',
    validateProjectExists,
    body('name').notEmpty().withMessage('El nombre de la tarea es requerida'),
    body('description').notEmpty().withMessage('La descripión de la tarea es obligatoria'),
    handleInputErrors,
    TaskController.createTask);

router.get('/:projectId/tasks', validateProjectExists, TaskController.getProjectTasks);
router.get('/:projectId/tasks/:taskId',
    validateProjectExists,
    TaskController.getTaskById);

export default router
