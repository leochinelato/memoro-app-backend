export interface Category {
    id: string
    name: string
    userId?: string
}

export interface CreateCategoryDTO {
    name: string
    userId: string
}

export interface CategoryRepository {
    create({name, userId}: CreateCategoryDTO): Promise<Category>
    findById(id: string): Promise<Category | null>
    findAllByUserId(userId: string): Promise<Category[]>
    update(userId: string, {id, name}: Category): Promise<Category>
    delete(userId: string, categoryId: string): Promise<Boolean>
}