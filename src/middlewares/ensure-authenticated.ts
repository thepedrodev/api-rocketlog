import { Request, Response, NextFunction } from "express";
import { authConfig } from "@/configs/auth";
import jwt from "jsonwebtoken";
import { AppError } from "@/utils/appError";

interface TokenPayload {
    role: string;
    sub: string; // sub normalmente é o id do usuário
}

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    try {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new AppError("JWT token not found", 401);
        }

        const [, token] = authHeader.split(" "); 

        const { role, sub } = jwt.verify(token, authConfig.jwt.secret) as TokenPayload;

        request.user = {
            id: sub,
            role
        };

        return next();
    } catch (error) {
        throw new AppError("Invalid JWT token", 401);
    }
}
