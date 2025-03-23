import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
import { UserCreate } from "../interfaces/user.interface";

export async function userRoutes(fastify: FastifyInstance) {
    const userUseCase = new UserUseCase()

    fastify.post<{Body: UserCreate}>('/register', async (request, reply) => {
        const { name, email, password } = request.body
        try {
            const user = await userUseCase.create({
                name,
                email,
                password
            })
            return reply.code(201).send({
                id: user.id,
                name: user.name,
                email: user.email
            })
        } catch (error) {
            reply.code(400).send({message: 'Error creating user.', error})
        }
    })

    fastify.post<{Body: {email: string, password: string}}>('/login', async (request, reply) => {
        const { email, password } = request.body

        try {
            const token = await userUseCase.loginUser(email, password)
            reply.send({ token })
        } catch (error) {
            reply.code(401).send({message: 'Invalid credentials.'})
        }
    })

    fastify.get('/', (request, reply) => {
        reply.send({hello: 'world'})
    })
}