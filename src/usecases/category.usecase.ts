import { Category, CategoryRepository, CreateCategoryDTO } from "interfaces/category.interface";
import { CategoryRepositoryPrisma } from "repositories/category.repository";

export class CategoryUseCase {
    private categoryRepository: CategoryRepository

    constructor() {
        this.categoryRepository = new CategoryRepositoryPrisma()
    }

    async getCategoriesByUser(userId: string) {
        return await this.categoryRepository.findAllByUserId(userId)
    }

    async getCategoriesById(id: string, userId: string) {
        const category = await this.categoryRepository.findById(id)

        if (!category) {
            throw new Error('Category not found.')
        }

        if (category.userId !== userId) {
            throw new Error('Unauthorized.')
        }

        return category
    }

    async create({ name, userId }: CreateCategoryDTO): Promise<Category> {
        if (!userId) {
            throw new Error('User not authenticated.')
        }

        const category = await this.categoryRepository.create({
            name, userId
        })
        return category
    }

    async update(userId: string, { id, name }: Category): Promise<Category> {
        const category = await this.categoryRepository.findById(id)

        if (!category) {
            throw new Error('Category not found.')
        }

        if (category.userId !== userId) {
            throw new Error('Unauthorized.')
        }

        const data = await this.categoryRepository.update(
            userId, { id, name }
        )

        return data
    }

    async delete(userId: string, id: string): Promise<Boolean> {
        const category = await this.categoryRepository.findById(id)

        if (!category) {
            throw new Error('Category not found.')
        }

        if (category?.userId !== userId) {
            throw new Error('Unauthorized.')
        }
        
        return await this.categoryRepository.delete(userId, id)
    }


}