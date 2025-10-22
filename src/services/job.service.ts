import { JobStatus } from "@prisma/client";
import prisma from "../prisma";
import { badRequest, notFound } from "../utils/api-error";

// @return Created job object

export const createJob = async (
    userId: number,
    company: string,
    source: string
) => {
    if (!userId) {
        throw badRequest("User id is required");
    }

    const job = await prisma.job.create({
        data: {
            company,
            source,
            userId,
        },
    });

    return job;
};

// @return Updated job object

export const updateJob = async (
    jobId: string,
    company: string,
    status: JobStatus,
    source: string
) => {
    if (!jobId) {
        throw badRequest("Job id is required");
    }

    const updatedJob = prisma.job.update({
        where: {
            id: jobId,
        },
        data: {
            company,
            status,
            source,
        },
    });

    return updatedJob;
};

// @return All jobs by user

export const getAllJobs = async (userId: number) => {
    if (!userId) {
        throw badRequest("User id is required");
    }

    const jobs = await prisma.job.findMany({
        where: {
            userId,
        },
    });

    return jobs;
};

// @return Deleted job confirmation

export const deleteJob = async (jobId: string) => {
    if (!jobId) {
        throw badRequest("Job id is required");
    }

    const deletedJob = await prisma.job.deleteMany({
        where: {
            id: jobId,
        },
    });

    if (deletedJob.count === 0) {
        throw notFound("Job not found");
    }

    return deletedJob;
};
