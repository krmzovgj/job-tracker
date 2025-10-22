import { badRequest, notFound, unauthorized } from "../utils/api-error";
import prisma from "../prisma";

// @return Created note object

export const createNote = async (
    userId: number,
    content: string,
    jobId: string | null
) => {
    if (!userId) {
        throw badRequest("User id is required");
    }

    const note = await prisma?.note.create({
        data: {
            content,
            userId,
            jobId: jobId ?? null,
        },
    });

    return note;
};

// @return Notes by user or job

export const getNotes = async (userId: number, jobId: string | null) => {
    if (!userId) {
        throw badRequest("User id is required");
    }

    const notes = await prisma.note.findMany({
        where: {
            userId,
            jobId: jobId ?? null,
        },
    });

    return notes;
};

// @return Deleted note confirmation

export const deleteNote = async (noteId: string, userId: number) => {
    if (!noteId) {
        throw badRequest("Note id is required");
    }

    const note = await prisma.note.findUnique({
        where: {
            id: noteId,
            userId,
        },
    });

    if (!note) {
        throw unauthorized("Premission denied");
    }

    const deletedNote = await prisma.note.deleteMany({
        where: {
            id: noteId,
            userId,
        },
    });

    if (deletedNote.count === 0) {
        throw notFound("Note not found");
    }

    return deletedNote;
};
