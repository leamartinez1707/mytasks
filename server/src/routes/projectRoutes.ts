import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middleware/project";
import { taskBelongsToProject, taskExists } from "../middleware/task";
import { authenticate } from "../middleware/auth";

const router = Router();
router.use(authenticate);

router.post(
  "/",
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

router.put(
  "/:id",
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
  ProjectController.updateProject
);

router.delete(
  "/:id",
  param("id").isMongoId().withMessage("El id del proyecto no es válido"),
  handleInputErrors,
  ProjectController.deleteProject
);

// Rutas para las tareas
router.param("projectId", projectExists);
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

export default router;
