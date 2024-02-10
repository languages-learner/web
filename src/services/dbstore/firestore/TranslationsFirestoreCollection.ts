import type { ITranslationsCollection } from '@/services/dbstore/interfaces/ITranslationsCollection'
import { BaseFirestoreCollection } from '@/services/dbstore/firestore/common/BaseFirestoreCollection'
import { type TranslationsCollectionItems } from '@/services/dbstore/interfaces/ITranslationsCollection'

const COLLECTION_NAME = 'translations'

export class TranslationsFirestoreCollection extends BaseFirestoreCollection<TranslationsCollectionItems> implements ITranslationsCollection {
    constructor() {
        super(COLLECTION_NAME)
    }

    public get = async (languageName: string): Promise<TranslationsCollectionItems | undefined> => {
        const item = await this._collection.doc(languageName).get()

        return item.exists ? item.data() as TranslationsCollectionItems : undefined
    }
}
