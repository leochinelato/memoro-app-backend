import { FastifyReply, FastifyRequest } from "fastify";
import { UserCreateDTO } from "interfaces/user.interface";
import { UserUseCase } from "usecases/user.usecase";
import { getUserId } from "utils/getUserId";

export class UserController {
    private userUseCase: UserUseCase

    constructor() {
        this.userUseCase = new UserUseCase()
    }

    async register(request: FastifyRequest<{ Body: UserCreateDTO }>, reply: FastifyReply) {
        const { name, email, password } = request.body
        try {
            const user = await this.userUseCase.create({
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
            reply.code(400).send({ message: 'Error creating user.', error })
        }
    }

    async login(request: FastifyRequest<{ Body: { email: string, password: string } }>, reply: FastifyReply) {
        const { email, password } = request.body
        try {
            const token = await this.userUseCase.loginUser(email, password)
            reply.send({ token })
        } catch (error) {
            reply.code(401).send({ message: 'Invalid credentials.' })
        }
    }

    async updateCurrentUser(request: FastifyRequest<{ Body: UserCreateDTO }>, reply: FastifyReply) {
        const userId = getUserId(request)

        const { email, name, password } = request.body

        try {
            const updatedUser = await this.userUseCase.updateUser(userId, {
                email, name, password
            })
            return reply.code(200).send(updatedUser)
        } catch (error) {
            reply.code(401).send(error)
        }
    }

    async deleteCurrentUser(request: FastifyRequest, reply: FastifyReply) {
        const userId = getUserId(request)
        try {
            const data = await this.userUseCase.deleteUser(userId)
            return reply.code(204).send(data)
        } catch (error) {
            return reply.code(500).send(error)
        }
    }

}