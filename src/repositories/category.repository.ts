import { prisma } from "database/prisma-client";
import { Category, CategoryRepository, CreateCategoryDTO } from "interfaces/category.interface";

export class CategoryRepositoryPrisma implements CategoryRepository {

    async findAllByUserId(userId: string): Promise<Category[]>{
        const result = await prisma.category.findMany({
            where: {
                userId
            }
        })
        return result
    }

    async findById(id: string): Promise<Category | null>{
        const result = await prisma.category.findFirst({
            where: {
                id
            }
        })
        return result || null
    }

    async create(data: CreateCategoryDTO): Promise<Category>{
        const result = await prisma.category.create({
            data: {
                name: data.name,
                userId: data.userId
            }
        })
        return result
    }

    async update(userId: string, {id,name}: Category): Promise<Category> {
        const result = await prisma.category.update({
            where: {
                userId, id
            },
            data: {
                name
            }
            
        })
        return result
    }

    async delete(userId: string, categoryId: string): Promise<Boolean> {
        const result = await prisma.category.delete({
            where: {
                id: categoryId,
                userId
            },
        })
        return result ? true : false
    }


}