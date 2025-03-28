import { FastifyReply, FastifyRequest } from "fastify";
import { CreateCategoryDTO } from "interfaces/category.interface";
import { CategoryUseCase } from "usecases/category.usecase";
import { getUserId } from "utils/getUserId";

export class CategoryController {
    private categoryUseCase: CategoryUseCase

    constructor() {
        this.categoryUseCase = new CategoryUseCase()
    }

    async getAll(request: FastifyRequest, reply: FastifyReply) {
        const userId = getUserId(request)
        try {
            const data = await this.categoryUseCase.getCategoriesByUser(userId)
            return reply.status(200).send(data)
        } catch (error) {
            reply.status(500).send(error)
        }
    }

    async getById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params
        const userId = getUserId(request)

        try {
            const data = await this.categoryUseCase.getCategoriesById(id, userId)
            return reply.status(200).send(data)
        } catch (error) {
            reply.status(500).send(error)
        }
    }

    async create(request: FastifyRequest<{ Body: CreateCategoryDTO }>, reply: FastifyReply) {
        const { name } = request.body
        const userId = getUserId(request)

        try {
            const data = await this.categoryUseCase.create({
                name, userId
            })
            return reply.code(200).send(data)
        } catch (error) {
            reply.code(500).send(error)
        }
    }

    async update(request: FastifyRequest<{ Body: CreateCategoryDTO, Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params
        const userId = getUserId(request)
        const { name } = request.body

        try {
            const data = await this.categoryUseCase.update(userId, { id, name })
            return reply.code(200).send(data)
        } catch (error) {
            reply.code(500).send(error)
        }
    }

    async delete(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params
        const userId = getUserId(request)
        try {
            const data = await this.categoryUseCase.delete(userId, id)
            return reply.code(204).send(data)
        } catch (error) {
            reply.code(500).send(error)
        }
    }
}