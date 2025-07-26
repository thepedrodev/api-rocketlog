import { Request, Response, NextFunction } from "express"
import { z } from 'zod'
import { prisma } from "@/database/prisma"

class DeliveryController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            user_id: z.string().uuid(),
            description: z.string(),
        })

        const { user_id, description } = bodySchema.parse(request.body)

        await prisma.delivery.create({
            data: {
                userId: user_id,
                description
            }
        })

        return response.status(201).json()
    }

    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const deliveries = await prisma.delivery.findMany({
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                }
            })

            return response.json(deliveries)
        } catch (error) {
            next(error)
        }

    }
}

export { DeliveryController }