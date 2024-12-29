import type { Request, Response } from 'express';
import Note, { INote } from '../models/Note';
import { Types } from 'mongoose';


type NoteParams = {
    noteId: Types.ObjectId;
}
export class NoteController {
    static createNote = async (req: Request<{}, {}, INote>, res: Response) => {

        const { content } = req.body;
        const note = new Note();

        note.content = content;
        note.createdBy = req.user.id;
        note.task = req.task.id;

        req.task.notes.push(note.id);
        try {
            await Promise.allSettled([note.save(), req.task.save()]);
            res.send('Nota creada correctamente');
        } catch (error) {
            res.status(500).json({ error: "Error al crear la nota" });
            return

        }
    }
    static getTaskNotes = async (req: Request, res: Response) => {

        try {
            const notes = await Note.find({ task: req.task.id });
            res.json(notes);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener las notas" });
            return

        }
    }

    static deleteNote = async (req: Request<NoteParams>, res: Response) => {

        const { noteId } = req.params;
        try {
            const note = await Note.findById(noteId);
            if (!note) {
                res.status(404).json({ error: "Nota no encontrada" });
                return
            }
            if (note.createdBy.toString() !== req.user.id.toString()) {
                res.status(404).json({ error: "Accion no valida" });
                return
            }
            req.task.notes = req.task.notes.filter(note => note.toString() !== noteId.toString())

            await Promise.allSettled([note.deleteOne(), req.task.save()]);
            res.send('Nota eliminada correctamente');
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar la nota" });
            return

        }
    }
}