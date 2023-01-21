import type User from '@/services/dbstore/dto/User'

export interface IUserCollection {
    create(user: User): Promise<void>
    get(): Promise<User | null>
}
