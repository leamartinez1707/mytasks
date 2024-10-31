import type { Request, Response, NextFunction } from "express";
import Task from "../models/Tasks";
import { ITask } from "../models/Tasks";

declare global {
  namespace Express {
    interface Request {
      task: ITask;
    }
  }
}

export const taskExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
      console.log('entro aca no encontro tarea')
      res.status(404).json({ error: "Tarea no encontrada" });
      return;
    }
    req.task = task;
    next();
  } catch (error) {
    res.status(400).json({ error: "No se pudo encontrar la tarea" });
  }
};

export const taskBelongsToProject = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.task.project.toString() !== req.project.id.toString()) {
    res
      .status(400)
      .json({ error: "No tienes permiso para acceder a esta tarea" });
    return;
  }
  next();
};
