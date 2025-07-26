import { Router } from "express";
import { SessionController } from "@/controllers/session-controller";

const sessionsRoutes = Router()
const sessionsControllers = new SessionController()

sessionsRoutes.post("/", sessionsControllers.create)

export {sessionsRoutes}