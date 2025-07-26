import e, { Request, Response, NextFunction } from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"
import { compare } from "bcrypt"
import { AppError } from "@/utils/appError"
import { authConfig } from "@/configs/auth"
import jwt from "jsonwebtoken" //= because ES Modules

class SessionController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                email: z.string().email(),
                password: z.string().min(6)
            })

            const { email, password } = bodySchema.parse(request.body)

            const user = await prisma.user.findFirst({
                where: { email }
            })

            if (!user) {
                throw new AppError("This session not exist")
            }

            const passwordMatched = await compare(password, user.password)

            if (!passwordMatched) {
                throw new AppError("Invalid email or password", 401)
            }

            const { secret, expiresIn } = authConfig.jwt

            const token = jwt.sign({role: user.role ?? "customer"}, secret, {
                subject: user.id,
                expiresIn
            })

            const {password: hashedPassword, ...userWithoutPassword} = user

            return response.json({ token, user: userWithoutPassword})
        } catch (error) {
            next(error)
        }
    }
}

export { SessionController }