import request from "supertest"
import { app } from "@/app"

import { prisma } from "@/database/prisma";

describe("UsersControllers", () => {
    let user_id: string

    afterAll(async () => {
        await prisma.user.delete({ where: { id: user_id } })
    })

    it("should create a new user sucessfully", async () => {
        const response = await request(app).post("/users").send({
            name: "MarioBros",
            email: "mario@gmail.com",
            password: "password123"
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
        expect(response.body.name).toBe("MarioBros")

        user_id = response.body.id
    })

    it("should throw an error if user with same email already exists", async () => {
        const response = await request(app).post("/users").send({
            name: "User WithSameEmail",
            email: "rodrigo@gmail.com",
            password: "123456"
        })

        expect(response.status).toBe(400)
        expect(response.body.message).toBe("User with same email already exist")
    })

    it("shoult throw an error if user email is invalid", async () => {
        const response = await request(app).post("/users").send({
            name: "User WithSameEmail",
            email: "invalid-email",
            password: "123456"
        })

        expect(response.status).toBe(400)
        expect(response.body.message).toBe("validation error")
    })
})
