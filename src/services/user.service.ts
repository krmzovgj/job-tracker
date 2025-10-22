import { badRequest, notFound } from "../utils/api-error";
import prisma from "../prisma";

// @return User object

export const getUserById = async (userId: number) => {
    if (!userId) {
        throw badRequest("User id is required");
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            password: false
        }
    });

    if (!user) {
        throw notFound("User not found");
    }

    return user
};
