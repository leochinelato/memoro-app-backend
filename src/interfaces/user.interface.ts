export interface User {
    id: string
    name: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
}

export interface UserCreate {
    name: string
    email: string
    password: string
}

export interface UserUpdate {
    name?: string
    email?: string
    password?: string
}


export interface UserRepository {
    create(data: UserCreate): Promise<User>
    findByEmail(email: string): Promise<User | null>
    findUserById(userId: string): Promise<User | null>
    updateUser(userId: string, data: UserUpdate): Promise<User>
    deleteUser(userId: string): Promise<Boolean>
}