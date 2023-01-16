import type { IDbStore } from '@/services/dbstore/common/IDbStore'
import { UserFirestoreCollection } from '@/services/dbstore/firestore/UserFirestoreCollection'
import { TranslationsFirestoreCollection } from '@/services/dbstore/firestore/TranslationsFirestoreCollection'
import { WordsFirestoreCollection } from '@/services/dbstore/firestore/WordsFirestoreCollection'

export class Firestore implements IDbStore {
    private static instance: Firestore

    public static getInstance(): IDbStore {
        if (!Firestore.instance) {
            Firestore.instance = new Firestore()
        }

        return Firestore.instance
    }

    public readonly userCollection: UserFirestoreCollection
    public readonly translationCollection: TranslationsFirestoreCollection
    public readonly wordsCollection: WordsFirestoreCollection

    constructor() {
        this.userCollection = new UserFirestoreCollection()
        this.translationCollection = new TranslationsFirestoreCollection()
        this.wordsCollection = new WordsFirestoreCollection()
    }
}
