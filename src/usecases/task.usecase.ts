import { Task, TaskCreate, TaskRepository } from "../interfaces/task.interface";
import { UserRepository } from "../interfaces/user.interface";
import { TaskRepositoryPrisma } from "../repositories/task.repository";
import { UserRepositoryPrisma } from "../repositories/user.repository";
import { TaskStatus } from "@prisma/client";

export class TaskUseCase {
    private taskRepository: TaskRepository
    private userRepository: UserRepository

    constructor() {
        this.taskRepository = new TaskRepositoryPrisma()
        this.userRepository = new UserRepositoryPrisma()
    }

    async create({ name, description, status, userId, categoryId, startsAt, endsAt }: TaskCreate): Promise<Task> {
        const validStatus = status ?? TaskStatus.PENDING;

        if (!userId) {
            throw new Error('User not authenticated.')
        }

        if (!Object.values(TaskStatus).includes(validStatus)) {
            throw new Error(`Invalid status. Allowed values: ${Object.values(TaskStatus).join(', ')}`);
        }

        const task = await this.taskRepository.create({
            name, description, status: validStatus, userId, categoryId, startsAt, endsAt
        })
        return task
    }

    async getTasksByUser(userId: string) {
        const tasks = await this.taskRepository.findAllByUserId(userId)
        return tasks
    }


    async updateTask(userId: string, { id, name, description, status, categoryId, startsAt, endsAt }: Task) {
        const task = await this.taskRepository.findById(id)

        if (!task) {
            throw new Error('Task not found.')
        }

        if (task.userId !== userId) {
            throw new Error('Unauthorized.')
        }
        
        const data = await this.taskRepository.updateTask(
            userId,
            {
                id,
                name,
                description,
                status,
                categoryId,
                startsAt,
                endsAt
            })
        return data
    }

    async delete(taskId: string, userId: string) {
        const task = await this.taskRepository.findById(taskId)

        if (!task) {
            throw new Error('Task not found.')
        }

        if (task.userId !== userId) {
            throw new Error('Unauthorized.')
        }

        return await this.taskRepository.delete(taskId, userId)
    }



}