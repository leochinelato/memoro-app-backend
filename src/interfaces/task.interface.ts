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

export interface TaskCreate {
    name: string
	description?: string
	status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
	userEmail: string
	categoryId?: string
    startsAt: Date
	endsAt: Date
}

export interface TaskCreateData {
    name: string
	description?: string
	status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
	userId: string
	categoryId?: string
    startsAt: Date
	endsAt: Date
}

export interface TaskRepository {
    create({name, description, status, userId, categoryId, startsAt, endsAt}: TaskCreateData): Promise<Task>;
    findByName(name: string): Promise<Task | null>
	findAllTasks(userId: string): Promise<Task[]>
	updateTask({id, name, description, status, categoryId, userId, startsAt, endsAt}: Task): Promise<Task>
	delete(id: string): Promise<Boolean>
	findById(id: string): Promise<Task | null>
}