import type { Request, Response, NextFunction } from 'express';
import Project from '../models/Project';
import { IProject } from '../models/Project';

declare global {
    namespace Express {
        interface Request {
            project: IProject;
        }
    }
}

export const validateProjectExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findById(projectId);
        if (!project) {
            res.status(404).json({ error: 'Proyecto no encontrado' });
            return;
        }
        req.project = project;
        next();
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
}