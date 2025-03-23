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

    async create({ name, description, status, userEmail, categoryId, startsAt, endsAt }: TaskCreate): Promise<Task> {
        const user = await this.userRepository.findByEmail(userEmail)
        const validStatus = status ?? TaskStatus.PENDING;

        if (!user) {
            throw new Error('User with email ' + userEmail + ' not found.')
        }

        if (!Object.values(TaskStatus).includes(validStatus)) {
            throw new Error(`Invalid status. Allowed values: ${Object.values(TaskStatus).join(', ')}`);
        }

        const task = await this.taskRepository.create({
            name, description, status, userId: user.id, categoryId, startsAt, endsAt
        })
        return task
    }

    async listAllTasks(userEmail: string) {
        const user = await this.userRepository.findByEmail(userEmail)

        if (!user) {
            throw new Error('User not found')
        }

        const tasks = await this.taskRepository.findAllTasks(user.id)

        return tasks
    }

    
    async updateTask({ id, name, description, status, categoryId, userId, startsAt, endsAt }: Task) {
        const data = await this.taskRepository.updateTask({
            id,
            name,
            description,
            status,
            categoryId,
            userId,
            startsAt,
            endsAt
        })
        return data
    }

    async delete(id: string, userEmail: string) {
        const user = await this.userRepository.findByEmail(userEmail)
        const task = await this.taskRepository.findById(id)
        
        if (!user) {
            throw new Error('User not found.')
        }

        if (!task) {
            throw new Error('Task not found.')
        }

        if (task.userId !== user.id) {
            throw new Error('Unauthorized: you cannot delete tasks that are not yours.')
        }

        return await this.taskRepository.delete(id)
    }
 


}