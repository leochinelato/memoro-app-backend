import { CategoryController } from "controllers/category.controller";
import { FastifyInstance } from "fastify";
import { verifyJWT } from "middlewares/auth.middleware";

export async function categoryRoutes(fastify: FastifyInstance) {
    const categoryController = new CategoryController()

    fastify.addHook('onRequest', verifyJWT)

    fastify.get('/', categoryController.getAll.bind(categoryController))
    fastify.get('/:id', categoryController.getById.bind(categoryController))
    fastify.post('/', categoryController.create.bind(categoryController))
    fastify.put('/:id', categoryController.update.bind(categoryController))
    fastify.delete('/:id', categoryController.delete.bind(categoryController))

}