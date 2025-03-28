export interface User {
    id: string
    name: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
}

export interface UserCreateDTO {
    name: string
    email: string
    password: string
}

export interface UserUpdateDTO {
    name?: string
    email?: string
    password?: string
}

export interface UserRepository {
    create(data: UserCreateDTO): Promise<User>
    findByEmail(email: string): Promise<User | null>
    findUserById(userId: string): Promise<User | null>
    updateUser(userId: string, data: UserUpdateDTO): Promise<User>
    deleteUser(userId: string): Promise<Boolean>
}