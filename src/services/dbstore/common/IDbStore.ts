import type { ICollection } from '@/services/dbstore/common/ICollection'
import type User from '@/models/User'
import type { IWordsCollection } from '@/services/dbstore/interfaces/IWordsCollection'

export interface IDbStore {
    readonly userCollection: ICollection<User>
    readonly translationCollection: ICollection<any>
    readonly wordsCollection: IWordsCollection
}
