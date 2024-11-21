import { Request, Response } from "express"
import Auth from "../models/Auth"
import Project from "../models/Project"

export class TeamMemberControler {
    static findMemberByEmail = async (req: Request, res: Response) => {
        const { email } = req.body

        const user = await Auth.findOne({ email }).select('id email name')
        if (!user) {
            res.status(404).json({ error: 'No se encontró el usuario' })
            return
        }
        res.json(user)
    }
    static addMemberById = async (req: Request, res: Response) => {
        const { id } = req.body

        const user = await Auth.findById(id).select('id')
        if (!user) {
            res.status(404).json({ error: 'No se encontró el usuario' })
            return
        }

        if (req.project.team.some(team => team.toString() === user.id.toString())) {
            res.status(409).json({ error: 'El usuario ya existe en el proyecto' })
            return
        }
        req.project.team.push(user.id)
        await req.project.save()
        res.send('Miembro agregado correctamente!')
    }

    static deleteMemberById = async (req: Request, res: Response) => {
        const { id } = req.body

        if (!req.project.team.some(team => team.toString() === id)) {
            res.status(409).json({ error: 'El usuario no existe en el proyecto' })
            return
        }
        req.project.team = req.project.team.filter(teamMember => teamMember.toString() !== id)

        await req.project.save()
        res.send('Miembro eliminado correctamente')
    }

    static getProjectTeam = async (req: Request, res: Response) => {
        const project = await (await Project.findById(req.project.id)).populate({
            path: 'team',
            select: 'id name email'
        })

        res.json(project.team)
    }
}