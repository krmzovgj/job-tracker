import { NextFunction, Request, Response } from "express";

interface JobRequest extends Request {
    user?: {
        id: number
    }
}

// @desc Create job
// @route POST /

export const createJob = async (req: JobRequest, res: Response, next: NextFunction) => {
    const { company, source } = req.body
    const userId = req.user?.id
    
}