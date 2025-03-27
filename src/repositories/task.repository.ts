import { prisma } from "../database/prisma-client";
import { Task, TaskCreateDTO, TaskRepository } from "../interfaces/task.interface";

class TaskRepositoryPrisma implements TaskRepository {
    async create(data: TaskCreateDTO): Promise<Task> {
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

    async findAllByUserId(userId: string): Promise<Task[]> {
        const result = await prisma.task.findMany({
            where: { userId }
        })
        return result
    }

    async updateTask(userId: string, {id, name, description, status, categoryId, startsAt, endsAt}: Task): Promise<Task> {
        const result = await prisma.task.update({
            where: {
                id, userId
            },
            data: {
                name, description, status, categoryId, startsAt, endsAt
            }
        })
        return result
    }
    
    async delete(taskId: string, userId: string): Promise<Boolean> {
        const result = await prisma.task.delete({
            where: {
                id: taskId,
                userId
            },
        })
        console.log(result)
        return result ? true : false
    }
}

export { TaskRepositoryPrisma }