import { NextFunction, Request, Response } from "express";
import * as userService from "../services/user.service";

interface UserRequest extends Request {
    user?: {
        id: number;
    };
}

// @desc Get user by id
// @route GET /:id

export const getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = parseInt(req.params.id);

    try {
        const user = await userService.getUserById(userId);

        res.status(200).json({ user });
    } catch (error: any) {
        if (error.message) {
            return res
                .status(error.statusCode)
                .json({ message: error.message });
        }
    }
};

// @desc Delete user account
// @router DELETE /

export const deleteAccount = async (
    req: UserRequest,
    res: Response,
    next: NextFunction
) => {
    const userId = req.user?.id;
    await userService.deleteAccount(userId!);

    res.status(200).json({
        message: "Account deleted",
    });

    try {
    } catch (error: any) {
        if (error.message) {
            return res
                .status(error.statusCode)
                .json({ message: error.message });
        }
    }
};
