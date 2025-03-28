import { FastifyReply, FastifyRequest } from "fastify";
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

    async create() { }

    async update() { }

    async delete() { }
}