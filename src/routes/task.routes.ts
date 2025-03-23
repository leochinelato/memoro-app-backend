import { FastifyInstance } from "fastify";
import { TaskCreate } from "../interfaces/task.interface";
import { TaskUseCase } from "../usecases/task.usecase";
import { verifyJWT } from "../middlewares/auth.middleware";

export async function taskRoutes(fastify: FastifyInstance) {
    const taskUseCase = new TaskUseCase()

    fastify.addHook('onRequest', verifyJWT)

    fastify.post<{ Body: TaskCreate }>('/', async (request, reply) => {
        const { name, description, status, categoryId, startsAt, endsAt } = request.body
        const userId = request.user.id

        try {
            const data = await taskUseCase.create({
                name, description, status, userId, categoryId, startsAt, endsAt
            })
            return reply.code(201).send(data)
        } catch (error) {
            reply.code(500).send(error)
        }
    })

    fastify.get('/', async (request, reply) => {
        console.log(request.user)
        try {
            const data = await taskUseCase.getTasksByUser(request.user.id)
            return reply.send(data)
        } catch (error) {
            reply.code(500).send(error)
        }
    })

    fastify.put<{ Body: TaskCreate, Params: { id: string } }>('/:id', async (request, reply) => {
        const { id } = request.params
        const userId = request.user.id
        
        const { name, description, status, categoryId, startsAt, endsAt } = request.body
        try {
            const data = await taskUseCase.updateTask(userId ,{ id, name, description, status, categoryId, startsAt, endsAt })
            return reply.code(200).send(data)
        } catch (error) {
            reply.code(500).send(error)
        }
    })

    fastify.delete<{ Params: { taskId: string, userId: string } }>('/:id', async (request, reply) => {
        const { taskId } = request.params
        const userId = request.user.id
        try {
            const data = await taskUseCase.delete(taskId, userId)
            return reply.code(200).send(data)
        } catch (error) {
            console.log(error)
            reply.code(500).send(error)
        }
    })


}