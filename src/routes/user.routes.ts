import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
import { UserCreate } from "../interfaces/user.interface";

export async function userRoutes(fastify: FastifyInstance) {
    const userUseCase = new UserUseCase()

    fastify.post<{Body: UserCreate}>('/', async (request, reply) => {
        const { name, email } = request.body
        try {
            const data = await userUseCase.create({
                name,
                email
            })
            return reply.code(201).send(data)
        } catch (error) {
            reply.code(500).send(error)
        }
    })

    fastify.get('/', (request, reply) => {
        reply.send({hello: 'world'})
    })
}