import { FastifyReply, FastifyRequest } from "fastify";
import { UserCreate } from "interfaces/user.interface";
import { UserUseCase } from "usecases/user.usecase";

export class UserController {
    private userUseCase: UserUseCase

    constructor() {
        this.userUseCase = new UserUseCase()
    }

    async register(request: FastifyRequest<{ Body: UserCreate }>, reply: FastifyReply) {
        const { name, email, password } = request.body
        try {
            const user = await this.userUseCase.create({
                name,
                email,
                password
            })
            console.log('user registrado!!')
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
            console.log(token)
            reply.send({ token })
        } catch (error) {
            reply.code(401).send({ message: 'Invalid credentials.' })
        }
    }

    async updateCurrentUser(request: FastifyRequest<{ Body: UserCreate }>, reply: FastifyReply) {
        const userId = request.user.id

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

}