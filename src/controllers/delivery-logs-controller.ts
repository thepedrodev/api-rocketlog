import { Request, Response, NextFunction } from "express"
import { z } from "zod"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/appError"

class DeliveryLogsController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            delivery_id: z.string().uuid(),
            description: z.string()
        })

        const { delivery_id, description } = bodySchema.parse(request.body)

        const delivery = await prisma.delivery.findFirst({
            where: { id: delivery_id },
        })

        if (!delivery) {
            throw new AppError("Delivery not found.", 404)
        }

        if (delivery.status === "processing") {
            throw new AppError("change status to shipped.")
        }

        await prisma.deliveryLog.create({
            data: { deliveryId: delivery_id, description, }
        })

        return response.status(201).json({ delivery })
    }

    async show(request: Request, response: Response) {
        const paramsSchema = z.object({
            delivery_id: z.string().uuid()
        })

        const { delivery_id } = paramsSchema.parse(request.params)

        const delivery = await prisma.delivery.findUnique(
            { where: { id: delivery_id },
            include: {logs: {select: {description: true, createdAt: true}}}}
        )

        if (request.user?.role === "customer" && request.user.id !== delivery?.userId){
            throw new AppError("The user can only view their deliveries")
        }

        return response.json(delivery)
    }
}

export { DeliveryLogsController }