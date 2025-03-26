import { User, UserCreate, UserRepository, UserUpdate } from "../interfaces/user.interface";
import { UserRepositoryPrisma } from "../repositories/user.repository";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'adsk09sadm21='

export class UserUseCase {
    private userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepositoryPrisma()
    }

    async loginUser(email: string, password: string): Promise<string> {
        const user = await this.userRepository.findByEmail(email)

        if (!user || !user.password) {
            throw new Error('Invalid credentials.')
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            throw new Error('Invalid credentials.')
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: '7d'
        })
        
        return token
    }

    async create({ name, email, password }: UserCreate): Promise<User> {
        const verifyIfUserExists = await this.userRepository.findByEmail(email)

        if (verifyIfUserExists) {
            throw new Error('Email already being used.')
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        return await this.userRepository.create({ name, email, password: hashedPassword })
    }

    async updateUser(userId: string, data: UserUpdate): Promise<User> {
        if (!userId) {
            throw new Error('Unauthorized.')
        }
        
        const user = await this.userRepository.findUserById(userId)

        if (!user) {
            throw new Error('User not found.')
        }
        
        const hashedPassword = data.password ? await bcrypt.hash(data.password, 10) : user.password
        const updatedUser = await this.userRepository.updateUser(userId, {
            name: data.name,
            email: data.email,
            password: hashedPassword
        })

        return updatedUser
    }

    async deleteUser(userId: string) {
        if (!userId) {
            throw new Error('Unauthorized.')
        }

        return await this.userRepository.deleteUser(userId)
    }
}