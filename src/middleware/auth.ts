import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
    };
}

export const verifyToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(403).json({
            message: "No Access token provided",
        });
    }

    const token = header?.split(" ")[1];

    if (!token) {
        return res.status(404).json({
            message: "Invalid token",
        });
    }

    try {
         const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            id: number;
            email: string;
        };
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(404).json({ message: "Invalid or expired token" });
    }
};
