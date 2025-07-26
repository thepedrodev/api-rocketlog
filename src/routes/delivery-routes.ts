import { Router } from "express";
import { DeliveryController } from "@/controllers/delivery-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"
import { DeliveryStatusController } from "@/controllers/delivery-status-controller"

const deliveryRoutes = Router()
const deliveryControllers = new DeliveryController()
const deliveryStatusControllers = new DeliveryStatusController()

deliveryRoutes.use(ensureAuthenticated, verifyUserAuthorization(["sale"]))

deliveryRoutes.post("/", deliveryControllers.create)
deliveryRoutes.get("/", deliveryControllers.index)

deliveryRoutes.patch("/:id/status", deliveryStatusControllers.update)

export { deliveryRoutes }