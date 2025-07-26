import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { deliveryRoutes } from "./delivery-routes"
import { deliveryLogsRoutes } from "./delivery-logs-routes"

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoutes)
routes.use("/deliveries", deliveryRoutes)
routes.use("/delivery-logs", deliveryLogsRoutes)

export { routes }