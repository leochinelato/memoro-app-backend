import { FastifyInstance } from "fastify";
import { TaskCreate } from "../interfaces/task.interface";
import { TaskUseCase } from "../usecases/task.usecase";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserUseCase } from "../usecases/user.usecase";

export async function taskRoutes(fastify: FastifyInstance) {
    const taskUseCase = new TaskUseCase()

    fastify.addHook('preHandler', authMiddleware)

    fastify.post<{ Body: TaskCreate }>('/', async (request, reply) => {
        const { name, description, status, categoryId, startsAt, endsAt } = request.body
        const emailUser = request.headers['email'] as string
        try {
            const data = await taskUseCase.create({
                name, description, status, userEmail: emailUser, categoryId, startsAt, endsAt
            })
            return reply.code(201).send(data)
        } catch (error) {
            reply.code(500).send(error)
        }
    })

    fastify.get('/', async (request, reply) => {
        const emailUser = request.headers['email'] as string
        try {
            const data = await taskUseCase.listAllTasks(emailUser)
            return reply.send(data)
        } catch (error) {
            reply.code(500).send(error)
        }
    })

    fastify.put<{ Body: TaskCreate, Params: { id: string } }>('/:id', async (request, reply) => {
        const { id } = request.params
        const { name, description, status, categoryId, startsAt, endsAt } = request.body
        try {
            const data = await taskUseCase.updateTask({ id, name, description, status, categoryId, startsAt, endsAt })
            return reply.code(200).send(data)
        } catch (error) {
            reply.code(500).send(error)
        }
    })

    fastify.delete<{Params: {id: string}}>('/:id', async (request, reply) => {
        const emailUser = request.headers['email'] as string

        const { id } = request.params
        try {
            const data = await taskUseCase.delete(id, emailUser)
            return reply.code(200).send(data)
        } catch (error) {
            reply.code(500).send(error)
        }
    })


}