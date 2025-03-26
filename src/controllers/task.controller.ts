import { FastifyReply, FastifyRequest } from "fastify";
import { TaskCreate } from "interfaces/task.interface";
import { TaskUseCase } from "usecases/task.usecase";

export class TaskController {
    private taskUseCase: TaskUseCase

    constructor() {
        this.taskUseCase = new TaskUseCase()
    }

    async getAll(request: FastifyRequest, reply: FastifyReply) {
        try {
            const data = await this.taskUseCase.getTasksByUser(request.user.id)
            return reply.status(200).send(data)
        } catch (error) {
            reply.status(500).send(error)
        }
    }

    async getById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params
        const userId = request.user.id

        try {
            const data = await this.taskUseCase.getTaskById(id, userId)
            return reply.code(200).send(data)
        } catch (error) {
            reply.code(500).send(error)
        }
    }

    async create(request: FastifyRequest<{ Body: TaskCreate }>, reply: FastifyReply) {
        const { name, description, status, categoryId, startsAt, endsAt } = request.body
        const userId = request.user.id

        try {
            const data = await this.taskUseCase.create({
                name, description, status, userId, categoryId, startsAt, endsAt
            })
            return reply.code(201).send(data)
        } catch (error) {
            reply.code(500).send(error)
        }
    }

    async update(request: FastifyRequest<{ Body: TaskCreate, Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params
        const userId = request.user.id

        const { name, description, status, categoryId, startsAt, endsAt } = request.body
        try {
            const data = await this.taskUseCase.update(userId, { id, name, description, status, categoryId, startsAt, endsAt })
            console.log("alterado")
            return reply.code(200).send(data)
        } catch (error) {
            reply.code(500).send(error)
        }
    }

    async delete(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params
        const userId = request.user.id
        try {
            console.log(id)
            const data = await this.taskUseCase.delete(id, userId)
            return reply.code(200).send(data)
        } catch (error) {
            console.log(error)
            reply.code(500).send(error)
        }
    }
}