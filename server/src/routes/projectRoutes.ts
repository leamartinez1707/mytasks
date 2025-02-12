import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middleware/project";
import { hasAuthorization, taskBelongsToProject, taskExists } from "../middleware/task";
import { authenticate } from "../middleware/auth";
import { TeamMemberControler } from "../controllers/TeamController";
import { NoteController } from "../controllers/NoteController";

const router = Router();
router.use(authenticate);

router.post("/",
  authenticate,
  body("projectName")
    .notEmpty()
    .withMessage("El nombre del proyecto es requerido"),
  body("clientName")
    .notEmpty()
    .withMessage("El nombre del cliente es requerido"),
  body("description")
    .notEmpty()
    .withMessage("La descripción del proyecto es requerida"),
  handleInputErrors,
  ProjectController.createProject
);

router.get("/", authenticate, ProjectController.getAllProjects);

router.get(
  "/:id",
  param("id").isMongoId().withMessage("El id del proyecto no es válido"),
  handleInputErrors,
  ProjectController.getProjectWithId
);

router.param("projectId", projectExists);

router.put(
  "/:projectId",
  param('projectId').isMongoId().withMessage('El id del proyecto no es válido'),
  body("projectName")
    .notEmpty()
    .withMessage("El nombre del proyecto es requerido"),
  body("clientName")
    .notEmpty()
    .withMessage("El nombre del cliente es requerido"),
  body("description")
    .notEmpty()
    .withMessage("La descripción del proyecto es requerida"),
  handleInputErrors,
  hasAuthorization,
  ProjectController.updateProject
);

router.delete(
  "/:projectId",
  param("projectId").isMongoId().withMessage("El id del proyecto no es válido"),
  handleInputErrors,
  hasAuthorization,
  ProjectController.deleteProject
);

// Rutas para las tareas

// Cada vez que se haga una peticion con el parametro projectId, se va a ejecutar la funcion validateProjectExists
router.param("taskId", taskExists);
router.param("taskId", taskBelongsToProject);

router.post(
  "/:projectId/tasks",
  body("name").notEmpty().withMessage("El nombre de la tarea es requerida"),
  body("description")
    .notEmpty()
    .withMessage("La descripión de la tarea es obligatoria"),
  handleInputErrors,
  TaskController.createTask
);

router.get("/:projectId/tasks", TaskController.getProjectTasks);

router.get(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("El id del proyecto no es válido"),
  handleInputErrors,
  TaskController.getTaskById
);

router.put(
  "/:projectId/tasks/:taskId",
  hasAuthorization,
  param("taskId").isMongoId().withMessage("El id de la tarea no es válida"),
  body("name").notEmpty().withMessage("El nombre de la tarea es requerida"),
  body("description")
    .notEmpty()
    .withMessage("La descripión de la tarea es obligatoria"),
  handleInputErrors,
  TaskController.updateTask
);

router.delete(
  "/:projectId/tasks/:taskId",
  hasAuthorization,
  param("taskId").isMongoId().withMessage("El id del proyecto no es válido"),
  handleInputErrors,
  TaskController.deleteTask
);

router.put(
  "/:projectId/tasks/:taskId/status",
  param("taskId").isMongoId().withMessage("El id de la tarea no es válido"),
  body("status").notEmpty().withMessage("El estado de la tarea es obligatorio"),
  handleInputErrors,
  TaskController.updateTaskStatus
);

// Rutas para el equipo

router.post('/:projectId/team/find',
  body('email').isEmail().toLowerCase().withMessage('El email no es válido'),
  handleInputErrors,
  TeamMemberControler.findMemberByEmail);

router.get('/:projectId/team', TeamMemberControler.getProjectTeam
)
router.post('/:projectId/team',
  body('id').isMongoId().withMessage('El id del usuario no es válido'),
  handleInputErrors,
  TeamMemberControler.addMemberById);

router.delete('/:projectId/team/:userId',
  param('userId').isMongoId().withMessage('El id del usuario no es válido'),
  handleInputErrors,
  TeamMemberControler.deleteMemberById);

// Rutas para las notas

router.post('/:projectId/tasks/:taskId/notes',

  body('content').notEmpty().withMessage('El contenido de la nota es requerido'),
  handleInputErrors,
  NoteController.createNote)

router.get('/:projectId/tasks/:taskId/notes',
  NoteController.getTaskNotes)

router.delete('/:projectId/tasks/:taskId/notes/:noteId',
  param('noteId').isMongoId().withMessage('El id de la nota no es válido'),
  NoteController.deleteNote)

export default router;
