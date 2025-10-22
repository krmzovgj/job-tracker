import { NextFunction, Request, Response } from "express";
import * as userService from "../services/user.service";

// @desc Get user by id
// @route GET /:id

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.id);

    try {
        const user = await userService.getUserById(userId);

        res.status(200).json({ user });
    } catch (error: any) {
        if (error.message) {
            return res.status(error.statusCode).json({ message: error.message });
        }
    }
};
