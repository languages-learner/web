import User from '@/models/User'

export interface IUserCollection {
    create(user: User): Promise<void>
    get(): Promise<User | null>
}
