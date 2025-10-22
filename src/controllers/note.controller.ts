import { NextFunction, Request, Response } from "express";
import * as noteService from "../services/note.service";

interface NoteRequest extends Request {
    user?: {
        id: number;
    };
}

// @ desc Create a note
// @POST /

export const createNote = async (
    req: NoteRequest,
    res: Response,
    next: NextFunction
) => {
    const userId = req.user?.id;
    const jobId =
        req.query.jobId && req.query.jobId !== "null"
            ? String(req.query.jobId)
            : null;
    const { content } = req.body;

    try {
        const note = await noteService.createNote(userId!, content, jobId);

        res.status(201).json({ note });
    } catch (error: any) {
        if (error.message) {
            return res
                .status(error.statusCode)
                .json({ message: error.message });
        }
    }
};

export const getNotes = async (
    req: NoteRequest,
    res: Response,
    next: NextFunction
) => {
    const userId = req.user?.id;
    const jobId =
        req.query.jobId && req.query.jobId !== "null"
            ? String(req.query.jobId)
            : null;

    try {
        const notes = await noteService.getNotes(userId!, jobId);
        res.status(200).json(notes);
    } catch (error: any) {
        if (error.message) {
            return res
                .status(error.statusCode)
                .json({ message: error.message });
        }
    }
};

// @desc Delete note
// @route DELETE /:id

export const deleteNote = async (
    req: NoteRequest,
    res: Response,
    next: NextFunction
) => {
    const userId = req.user?.id;
    const noteId = req.params.id;

    try {
        await noteService.deleteNote(noteId, userId!);
        res.status(200).json({ message: "Note deleted successfuly" });
    } catch (error: any) {
        if (error.message) {
            res.status(error.statusCode).json({ message: error.message });
        }
    }
};
