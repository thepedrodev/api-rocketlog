import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/appError";

function verifyUserAuthorization(role: string[]) {
    return (request: Request, response: Response, next: NextFunction) => {
        if (!request.user) {
            throw new AppError("Unauthorization", 401)
        }

        if (!role.includes(request.user.role)) {
            throw new AppError("Unauthorization", 401)
        }

        return next()
    }
}

export { verifyUserAuthorization }