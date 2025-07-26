import { PrismaClient } from "@prisma/client"
import { log } from "console"

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "production" ? [] : ["query"]
})


export { prisma }