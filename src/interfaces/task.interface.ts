export interface Task {
    id: string
	name: string
	description?: string | null
	status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
	userId?: string
	categoryId?: string | null
	startsAt: Date
	endsAt: Date
}

export interface TaskCreateDTO {
    name: string
	description?: string
	status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
	userId: string
	categoryId?: string
    startsAt: Date
	endsAt: Date
}

export interface TaskRepository {
    create({name, description, status, userId, categoryId, startsAt, endsAt}: TaskCreateDTO): Promise<Task>;
    findByName(name: string): Promise<Task | null>
	findAllByUserId(userId: string): Promise<Task[]>
	updateTask(userId: string, {id, name, description, status, categoryId, startsAt, endsAt}: Task): Promise<Task>
	delete(id: string, userId: string): Promise<Boolean>
	findById(id: string): Promise<Task | null>
}