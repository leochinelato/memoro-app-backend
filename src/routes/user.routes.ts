import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
import { UserCreate } from "../interfaces/user.interface";
import { verifyJWT } from "middlewares/auth.middleware";
import { TaskUseCase } from "usecases/task.usecase";
import { UserController } from "controllers/user.controller";

export async function userRoutes(fastify: FastifyInstance) {
    const userController = new UserController()

    fastify.post('/register', userController.register.bind(userController))
    fastify.post('/login', userController.login.bind(userController))

    fastify.register(async (privateRoutes) => {
        privateRoutes.addHook('onRequest', verifyJWT)
        privateRoutes.patch('/me', userController.updateCurrentUser.bind(userController))
    })
}