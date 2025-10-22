import prisma from "../prisma"
import { badRequest } from "../utils/api-error"

// @return Created job object

const createJob = async (userId: number, company: string, source: string) => {
    if(!userId) {
        throw badRequest("User id is required")
    }

    
}