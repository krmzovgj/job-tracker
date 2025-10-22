import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
    };
}

interface TokenPayload extends JwtPayload {
    id: number;
    email: string;
}

export const verifyToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const header = req.headers.authorization;

    if (!header) {
        res.status(403).json({
            message: "No Access token provided",
        });
    }

    const token = header?.split(" ")[1];

    if (!token) {
        res.status(404).json({
            message: "Invalid token",
        });
    }

    try {
        const decoded = jwt.verify(
            token!,
            process.env.SECRET_KEY!
        ) as TokenPayload;

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(404).json({ message: "Invalid or expired token" });
    }
};
