import { prisma } from "../database/prisma-client";
import { Task, TaskCreate, TaskCreateData, TaskRepository } from "../interfaces/task.interface";

class TaskRepositoryPrisma implements TaskRepository {
    async create(data: TaskCreateData): Promise<Task> {
        const result = await prisma.task.create({
            data: {
                name: data.name,
                description: data.description,
                status: data.status,
                userId: data.userId,
                categoryId: data.categoryId,
                startsAt: data.startsAt,
                endsAt: data.endsAt
            }
        })
        return result
    }

    async findById(id: string): Promise<Task | null> {
        const result = await prisma.task.findFirst({
            where: {
                id
            }
        })
        return result || null
    }

    async findByName(name: string): Promise<Task | null> {
        const result = await prisma.task.findFirst({
            where: {
                name
            }
        })
        return result || null
    }

    async findAllTasks(userId: string): Promise<Task[]> {
        const result = await prisma.task.findMany({
            where: { userId }
        })
        return result
    }

    async updateTask({id, name, description, status, categoryId, userId, startsAt, endsAt}: Task): Promise<Task> {
        const result = await prisma.task.update({
            where: {id},
            data: {
                name, description, status, categoryId, userId, startsAt, endsAt
            }
        })
        return result
    }
    
    async delete(id: string): Promise<Boolean> {
        const result = await prisma.task.delete({
            where: {id}
        })
        return result ? true : false
    }
}

export { TaskRepositoryPrisma }