import type { Request, Response } from 'express'
import Project from '../models/Project';
import Task from '../models/Tasks';


export class TaskController {

    static createTask = async (req: Request, res: Response) => {
        try {
            const task = new Task(req.body);
            task.project = req.project.id;
            req.project.tasks.push(task.id);
            await Promise.allSettled([task.save(), req.project.save()]);
            res.send({ message: 'Tarea creada correctamente', data: task });
        } catch (error) {
            res.status(500).json({ error: 'Error en el servidor' });
        }
    }

    static getProjectTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({ project: req.project.id }).populate('project')
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: 'Error en el servidor' });
        }
    }

    static getTaskById = async (req: Request, res: Response) => {
        try {
            const task = await Task.findById(req.params.taskId);
            if (!task) {
                res.status(404).json({ error: 'Tarea no encontrada' });
                return;
            }
            if (task.project.toString() !== req.project.id) {
                res.status(400).json({ error: 'No tienes permiso para acceder a esta tarea' });
                return;
            }
            res.json(task);
        } catch (error) {
            res.status(500).json({ error: 'Error en el servidor' });
        }
    }



    static updateTask = async (req: Request, res: Response) => {
        res.send('Actualizando tarea')
    }

    static deleteTask = async (req: Request, res: Response) => {
        res.send('Eliminando tarea')
    }

}