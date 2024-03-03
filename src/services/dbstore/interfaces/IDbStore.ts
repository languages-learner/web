import type { IWordsCollection } from '@/services/dbstore/interfaces/IWordsCollection'
import type { IUserCollection } from '@/services/dbstore/interfaces/IUserCollection'
import type { ITranslationsCollection } from '@/services/dbstore/interfaces/ITranslationsCollection'

export interface IDbStore {
    readonly userCollection: IUserCollection
    readonly translationCollection: ITranslationsCollection
    readonly wordsCollection: IWordsCollection
}
