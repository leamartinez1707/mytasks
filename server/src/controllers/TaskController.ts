import type { Request, Response } from "express";
import Task from "../models/Tasks";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body);
      task.project = req.project.id;
      req.project.tasks.push(task.id);
      await Promise.allSettled([task.save(), req.project.save()]);
      res.send("Tarea creada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  };

  static getProjectTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({ project: req.project.id }).populate(
        "project"
      );
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  };

  static getTaskById = async (req: Request, res: Response) => {
    try {
      res.json(req.task);
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  };

  static updateTask = async (req: Request, res: Response) => {
    try {
      req.task.name = req.body.name;
      req.task.description = req.body.description;
      await req.task.save();
      res.send("Tarea actualizada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  };

  static deleteTask = async (req: Request, res: Response) => {
    try {
      req.project.tasks = req.project.tasks.filter(
        (task) => task._id !== req.task.id.toString()
      );

      await Promise.allSettled([req.task.deleteOne(), req.project.save()]);
      res.send("Tarea eliminada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  };

  static updateTaskStatus = async (req: Request, res: Response) => {
    try {
      const { status } = req.body;
      req.task.status = status;
      await req.task.save();
      res.send("Estado de la tarea actualizado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  };
}
