import { Ref } from 'vue'

export interface ICollection<T> {
    create: (item: Omit<T, 'id'>) => Promise<string>
    get: (id: string) => Promise<T | null>
    update: (id: string, item: Omit<T, 'uid'>) => Promise<void>
    delete: (id: string) => Promise<void>
    items: Ref<T[]>
}
