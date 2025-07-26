import { z } from "zod"

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string(),
    PORT: z.coerce.number().default(3333)
})

const env = envSchema.parse(process.env)

export { env }