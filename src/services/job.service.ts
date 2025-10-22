import { NextFunction } from "express";
import prisma from "../prisma";
import { badRequest } from "../utils/api-error";
import { JobStatus } from "@prisma/client";

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
            id: jobId
        },
        data: {
            company,
            status,
            source
        }
    }) 

    return updatedJob
};

