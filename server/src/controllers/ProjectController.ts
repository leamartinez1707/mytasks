import type { Request, Response } from "express";
import Project from "../models/Project";

export class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);

    // Asignar un manager al proyecto
    project.manager = req.user.id;

    try {
      await project.save();
      res.send("Se creó el proyecto correctamente");
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  };

  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({});
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  };

  static getProjectWithId = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id).populate("tasks");

      if (!project) {
        res.status(404).json({ error: "No se encontró el proyecto" });
        return;
      }

      res.json(project); // Enviar la respuesta pero no devolverla
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  };

  static updateProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id);
      if (!project) {
        res.status(404).json({ error: "No se encontró el proyecto" });
      }
      project.clientName = req.body.clientName;
      project.projectName = req.body.projectName;
      project.description = req.body.description;

      await project.save();
      res.json(project); // Enviar la respuesta pero no devolverla
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  };

  static deleteProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const founded = await Project.findById(id);
      if (!founded) {
        res.status(404).json({ error: "No se encontró el proyecto" });
      }
      await founded.deleteOne();

      res.send("Proyecto eliminado correctamente"); // Enviar la respuesta pero no devolverla
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  };
}
