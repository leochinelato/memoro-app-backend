import { User, UserCreate, UserRepository } from "../interfaces/user.interface";
import { UserRepositoryPrisma } from "../repositories/user.repository";

export class UserUseCase {
    private userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepositoryPrisma()
    }

    async create({name, email}: UserCreate): Promise<User> {
        const verifyIfUserExists = await this.userRepository.findByEmail(email)

        if (verifyIfUserExists) {
            throw new Error('Email already being used.')
        }

        const result = await this.userRepository.create({name, email})

        return result
    }
}