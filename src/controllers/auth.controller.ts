import { NextFunction, Request, Response } from "express";
import * as authService from "../services/auth.service";

// @desc Create account
// @route POST /create-account

export const createAccount = async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const user = await authService.createAccount(
            firstName,
            lastName,
            email,
            password
        );

        res.status(200).json({ user });
    } catch (error: any) {
        if (error.message) {
            return res.status(error.statusCode).json({
                message: error.message,
            });
        }
    }
};

// @desc Sign in with email and pw
// route POST /sign-in

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        const token = await authService.signIn(email, password);

        res.status(200).json({
            token,
        });
    } catch (error: any) {
        if (error.message) {
            return res.status(error.statusCode).json({
                message: error.message,
            });
        }
    }
};
