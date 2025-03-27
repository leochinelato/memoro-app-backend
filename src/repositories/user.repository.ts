import { prisma } from "../database/prisma-client";
import { User, UserCreateDTO, UserRepository, UserUpdateDTO } from "../interfaces/user.interface";

class UserRepositoryPrisma implements UserRepository {

    async create(data: UserCreateDTO): Promise<User> {
        const result = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password
            }
        })
        return result
    }
    
    async findByEmail(email: string): Promise<User | null> {
        const result = await prisma.user.findUnique({
            where: { email }
        })
        return result || null
    }

    async findUserById(userId: string): Promise<User | null> {
        const result = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        return result || null
    }

    async updateUser(userId: string, data: UserUpdateDTO): Promise<User> {
        const result = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                name: data.name,
                email: data.email,
                password: data.password
            }
        })
        return result
    }

    async deleteUser(userId: string): Promise<Boolean> {
        console.log(userId)
        const result = await prisma.user.delete({
            where: {
                id: userId
            }
        })
        return result ? true : false
    }
}

export { UserRepositoryPrisma }