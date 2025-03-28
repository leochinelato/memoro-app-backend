import fastify, { FastifyInstance } from "fastify"
import jwt from "@fastify/jwt"
import { userRoutes } from "./routes/user.routes"
import { taskRoutes } from "./routes/task.routes"
import dotenv from 'dotenv'
import { categoryRoutes } from "routes/category.routes"

dotenv.config()

const app: FastifyInstance = fastify()

app.register(jwt, {
    secret: process.env.JWT_SECRET as string || 'abc123'
})

app.register(userRoutes, {
    prefix: '/api/v1/users'
})

app.register(taskRoutes, {
    prefix: '/api/v1/tasks'
})

app.register(categoryRoutes, {
    prefix: '/api/v1/categories'
})

app.listen(
    {
        port: 3333
    },
    () => console.log('Running')
)