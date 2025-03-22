import fastify, { FastifyInstance } from "fastify"
import { userRoutes } from "./routes/user.routes"
import { taskRoutes } from "./routes/task.routes"

const app: FastifyInstance = fastify()

app.register(userRoutes, {
    prefix: '/api/v1/users'
})

app.register(taskRoutes, {
    prefix: '/api/v1/tasks'
})

app.listen(
    {
        port: 3333
    },
    () => console.log('Running')
)