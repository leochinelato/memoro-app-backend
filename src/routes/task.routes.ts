import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/auth.middleware";
import { TaskController } from "controllers/task.controller";

export async function taskRoutes(fastify: FastifyInstance) {
    const taskController = new TaskController()

    fastify.addHook('onRequest', verifyJWT)

    fastify.post('/', taskController.create.bind(taskController))
    fastify.get('/', taskController.getAll.bind(taskController))
    fastify.get('/:id', taskController.getById.bind(taskController))
    fastify.put('/:id', taskController.update.bind(taskController))
    fastify.delete('/:id', taskController.delete.bind(taskController))

}