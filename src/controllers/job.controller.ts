import { NextFunction, Request, Response } from "express";
import * as jobService from "../services/job.service";

interface JobRequest extends Request {
    user?: {
        id: number;
    };
}

// @desc Create job
// @route POST /

export const createJob = async (
    req: JobRequest,
    res: Response,
    next: NextFunction
) => {
    const { company, source } = req.body;
    const userId = req.user?.id;

    try {
        const job = await jobService.createJob(userId!, company, source);
        res.status(201).json({ job });
    } catch (error: any) {
        if (error.message) {
            res.status(error.statusCode).json({ message: error.message });
        }
    }
};

// @desc Update job
// @route /:id

export const updateJob = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { company, status, source } = req.body;
    const jobId = req.params.id;

    try {
        const job = await jobService.updateJob(jobId, company, status, source);

        res.status(200).json({ job });
    } catch (error: any) {
        if (error.message) {
            res.status(error.statusCode).json({ message: error.message });
        }
    }
};

// @desc Get jobs by user id
// @route GET /

export const getAllJobs = async (
    req: JobRequest,
    res: Response,
    next: NextFunction
) => {
    const userId = req.user?.id;
    try {
        const jobs = await jobService.getAllJobs(userId!);

        res.status(200).json(jobs);
    } catch (error: any) {
        if (error.message) {
            res.status(error.statusCode).json({ message: error.message });
        }
    }
};

// @desc Delete Job
// @route DELETE /:id

export const deleteJob = async (
    req: JobRequest,
    res: Response,
    next: NextFunction
) => {
    const jobId = req.params.id;

    try {
        await jobService.deleteJob(jobId);

        res.status(200).json({
            message: "Job deleted successfuly",
        });
    } catch (error: any) {
        if (error.message) {
            res.status(error.statusCode).json({ message: error.message });
        }
    }
};
